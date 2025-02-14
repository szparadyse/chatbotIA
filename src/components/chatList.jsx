import { useEffect, useRef, useState } from "react";
import Chat from "./chat";
import { useAuth } from "../contexts/authContext";
import { useParams } from "react-router-dom";

function ChatList() {
  //const { user } = useAuth();
  const chatEndRef = useRef(null);
  const [msgs, setMsgs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const socket = new WebSocket("http://172.27.74.25:3300/ws");
    socket.onopen = () => {
      console.log("connected");
    };

    socket.onmessage = (event) => {
      console.log(event.data);
    };
    const getMessage = async () => {
      const res = await fetch(`http://172.27.74.25:3300/api/messages/${id}`);
      const data = await res.json();
      console.log(data);
      setMsgs(data);
    };
    getMessage();

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // Déclenché à chaque mise à jour des messages
  return (
    <>
      {msgs.map((el, index) => {
        el.type = "received";
        /* if (el.sender.id === user.id) {
          type = "send";
        } */
        return (
          <Chat
            key={index}
            type={el.type}
            sender={[...el.sender]}
            message={el.message}
          />
        );
      })}
      <div ref={chatEndRef} />
    </>
  );
}

export default ChatList;
