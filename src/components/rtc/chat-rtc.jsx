import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { wrap } from "motion";

export const ChatRtc = () => {
  const tmpid = useParams().roomId;
  const [roomId, setRoomId] = useState(tmpid);

  const socket = useRef(null);
  const peerConnections = useRef({});
  const myVideo = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const remoteStreamsRef = useRef({});

  const pendingCandidates = useRef({}); // UseRef to track pending candidates
  const localUserId = useRef(null); // Store the local user ID

  useEffect(() => {
    console.log("My remote streams:", remoteStreams);
  }, [remoteStreams]);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:3300/ws/rtc/${roomId}`);

    // Handle WebSocket open and close events
    socket.current.onopen = () => {
      console.log("✅ WebSocket connected!");
    };

    socket.current.onclose = () => {
      console.log("❌ WebSocket closed!");
    };

    socket.current.onmessage = async (mess) => {
      console.log(mess);
      const data = JSON.parse(mess.data);

      switch (data.type) {
        case "new-user":
          // Create connection for each new user
          console.log(`New user joined: ${data.id}`);
          // Only create offer if it's not ourselves
          if (data.id !== localUserId.current) {
            createOffer(data.id);
          }
          break;
        case "offer":
          console.log(`Received offer from: ${data.id}`);
          // Only process offers that aren't from ourselves
          if (data.id !== localUserId.current) {
            createAnswer(data);
          }
          break;
        case "answer":
          console.log(`Received answer from: ${data.id}`);
          // Only process answers that aren't from ourselves
          if (data.id !== localUserId.current) {
            const pc = peerConnections.current[data.id];
            if (pc) {
              await pc.setRemoteDescription(
                new RTCSessionDescription(data.answer)
              );

              // Process pending ICE candidates
              processPendingCandidates(data.id);
            }
          }
          break;
        case "candidate":
          console.log(`Received candidate from: ${data.id}`);
          // Only process candidates that aren't from ourselves
          if (data.id !== localUserId.current) {
            handleCandidate(data);
          }
          break;
        case "user-left":
          console.log(`User left: ${data.id}`);
          // Clean up peer connection
          if (peerConnections.current[data.id]) {
            peerConnections.current[data.id].close();
            delete peerConnections.current[data.id];
          }

          // Remove video stream
          setRemoteStreams((prev) => {
            const newStreams = { ...prev };
            delete newStreams[data.id];
            return newStreams;
          });

          // Clean up references
          delete remoteStreamsRef.current[data.id];
          delete pendingCandidates.current[data.id];
          break;
        default:
          console.log("Unknown message type");
      }
    };
    return () => {
      // Close all peer connections
      Object.values(peerConnections.current).forEach((pc) => {
        if (pc) pc.close();
      });
      if (socket.current) socket.current.close();
    };
  }, [roomId]);

  const handleCandidate = async (data) => {
    if (!peerConnections.current[data.id]) {
      // Store candidate for later
      if (!pendingCandidates.current[data.id]) {
        pendingCandidates.current[data.id] = [];
      }
      pendingCandidates.current[data.id].push(data.candidate);
      return;
    }

    const pc = peerConnections.current[data.id];

    try {
      if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } else {
        // Store for later
        if (!pendingCandidates.current[data.id]) {
          pendingCandidates.current[data.id] = [];
        }
        pendingCandidates.current[data.id].push(data.candidate);
      }
    } catch (err) {
      console.error("Error adding ICE candidate:", err);
    }
  };

  const processPendingCandidates = async (userId) => {
    const pc = peerConnections.current[userId];

    if (
      pc &&
      pc.remoteDescription &&
      pendingCandidates.current[userId]?.length
    ) {
      console.log(
        `Processing ${pendingCandidates.current[userId].length} pending candidates for ${userId}`
      );

      while (pendingCandidates.current[userId].length > 0) {
        try {
          const candidate = pendingCandidates.current[userId].shift();
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding pending ICE candidate:", err);
        }
      }
    }
  };

  const sendMessage = (mess) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(mess));
    } else {
      console.error("WebSocket not connected");
    }
  };

  const iceServers = [{ urls: "stun:stun.l.google.com:19302" }];

  const joinRoom = async () => {
    try {
      // Generate a random user ID
      const userId = Math.random().toString(36).substring(2, 6);
      localUserId.current = userId;

      // Request camera and microphone access
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      myVideo.current.srcObject = localStream;
      console.log(`Joining room ${roomId} as user ${userId}`);

      // Join the room
      sendMessage({
        type: "join-room",
        roomId,
        id: userId,
      });

      setIsConnected(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Failed to access camera and microphone");
    }
  };

  const createOffer = async (remoteId) => {
    console.log(`Creating offer for ${remoteId}`);
    try {
      const pc = new RTCPeerConnection({ iceServers });
      peerConnections.current[remoteId] = pc;

      // Handle ICE candidates
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          sendMessage({
            type: "candidate",
            candidate: e.candidate,
            roomId,
            id: localUserId.current, // Send our ID as the source
            target: remoteId, // Add target ID to help routing
          });
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`ICE state with ${remoteId}: ${pc.iceConnectionState}`);
      };

      // Handle incoming tracks
      pc.ontrack = (e) => {
        console.log(`Received track from: ${remoteId}`, e.streams);

        if (e.streams && e.streams.length > 0) {
          remoteStreamsRef.current[remoteId] = e.streams[0];
          setRemoteStreams((prev) => ({
            ...prev,
            [remoteId]: e.streams[0],
          }));
        }
      };

      // Add local tracks
      const stream = myVideo.current.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => {
          console.log(
            `Adding ${track.kind} track to connection for ${remoteId}`
          );
          pc.addTrack(track, stream);
        });
      } else {
        console.error("No local stream found");
        return;
      }

      // Create and set offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer
      sendMessage({
        type: "offer",
        offerDescription: pc.localDescription,
        roomId,
        id: localUserId.current, // Send our ID as the source
        target: remoteId, // Add target ID to help routing
      });
    } catch (err) {
      console.error("Error creating offer:", err);
    }
  };

  const createAnswer = async (data) => {
    console.log(`Creating answer for ${data.id}`);
    try {
      const pc = new RTCPeerConnection({ iceServers });
      peerConnections.current[data.id] = pc;

      // Handle ICE candidates
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          sendMessage({
            type: "candidate",
            candidate: e.candidate,
            roomId,
            id: localUserId.current, // Send our ID as the source
            target: data.id, // Add target ID to help routing
          });
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`ICE state with ${data.id}: ${pc.iceConnectionState}`);
      };

      // Handle incoming tracks
      pc.ontrack = (e) => {
        console.log(`Received track from: ${data.id}`, e.streams);

        if (e.streams && e.streams.length > 0) {
          remoteStreamsRef.current[data.id] = e.streams[0];
          setRemoteStreams((prev) => ({
            ...prev,
            [data.id]: e.streams[0],
          }));
        }
      };

      // Get local stream
      let stream = myVideo.current?.srcObject;
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      }

      // Add local tracks
      stream.getTracks().forEach((track) => {
        console.log(`Adding ${track.kind} track to connection for ${data.id}`);
        pc.addTrack(track, stream);
      });

      // Set remote description (the offer)
      await pc.setRemoteDescription(
        new RTCSessionDescription(data.offerDescription)
      );

      // Process pending ICE candidates
      processPendingCandidates(data.id);

      // Create and set answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer
      sendMessage({
        type: "answer",
        answer: pc.localDescription,
        roomId,
        id: localUserId.current, // Send our ID as the source
        target: data.id, // Add target ID to help routing
      });
    } catch (err) {
      console.error("Error creating answer:", err);
    }
  };

  return (
    <div>
      <div
        className="grid grid-cols-1 gap-4"
        style={{
          gap: "10px",
          display: isConnected ? null : "none",
        }}
      >
        <video
          className="rounded-md border-4 border-red-400"
          id="webcamVideo"
          autoPlay
          playsInline
          muted
          ref={myVideo}
          style={{ width: "100%" }}
        ></video>
        {Object.entries(remoteStreams).map(([id, stream]) => (
          <video
            className="rounded-md"
            autoPlay
            playsInline
            style={{ width: "100%" }}
            ref={(vid) => {
              if (vid && stream) {
                vid.srcObject = stream;
              }
            }}
          />
        ))}
        {Object.keys(remoteStreams).length === 0 && (
          <p>No remote streams available</p>
        )}
      </div>
      <div style={{ display: isConnected ? "none" : "block" }}>
        <Button id="webcamButton" onClick={joinRoom} disabled={isConnected}>
          {isConnected ? "Connected" : "Join Room"}
        </Button>
      </div>
    </div>
  );
};
