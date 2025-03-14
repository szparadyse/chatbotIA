import { useEffect, useRef, useState } from "react";
import Chat from "./chat";
import { useAuth } from "../contexts/authContext";
import { useParams } from "react-router-dom";

function ChatList({ id }) {
  //const { user } = useAuth();
  const chatEndRef = useRef(null);
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_DB_URI}/ws`);
    socket.onopen = () => {
      console.log("connected");
    };

    socket.onmessage = (event) => {
      const parse = JSON.parse(event.data);
      if (parse.idRoom == id) {
        setMsgs((prev) => [...prev, JSON.parse(event.data)]);
      }
    };
    const getMessage = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_DB_URI}/api/messages/${id}`
      );
      const data = await res.json();
      console.log(data);
      setMsgs(data);
    };
    getMessage();

    return () => {
      socket.close();
    };
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // Déclenché à chaque mise à jour des messages
  return (
    <>
      {msgs.map((el, index) => {
        return <Chat key={index} sender={el.sender} message={el.content} />;
      })}
      <div ref={chatEndRef} />
    </>
  );
}

export default ChatList;
