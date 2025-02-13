import { useEffect, useRef } from 'react';
import Chat from './chat';


const data = [
  {
    sender: "Alice",
    type: "send",
    message: "Salut, comment ça va ?",
  },
  {
    sender: "Alice",
    type: "send",
    message: "Salut, comment ça va ?",
  },
  {
    sender: "Alice",
    type: "send",
    message: "Salut, comment ça va ?",
  },
  {
    sender: "Alice",
    type: "send",
    message: "Salut, comment ça va ?",
  },
  {
    sender: "Alice",
    type: "send",
    message: "Salut, comment ça va ?",
  },
  {
    sender: "Bob",
    type: "ia",
    message: "Ça va bien et toi ?",
  },
  {
    sender: "Charlie",
    type: "received",
    message: "Tu as avancé sur le projet ?",
  },
  {
    sender: "Alice",
    type: "send",
    message: "Oui, j'ai terminé la première partie !",
  },
  {
    sender: "Bob",
    type: "ia",
    message: "Super, on peut se voir demain pour en parler ?",
  },
  {
    sender: "Charlie",
    type: "received",
    message: "Oui, rendez-vous à 10h !",
  }
];

function ChatList() {

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]); // Déclenché à chaque mise à jour des messages
  return (
    <>
    {data.map((el, index) => 
        <Chat key={index} type={el.type} sender={el.sender} message={el.message} />
    )}
      <div ref={chatEndRef} />
    </>
  )
}

export default ChatList