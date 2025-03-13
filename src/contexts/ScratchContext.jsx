import { useEffect, useState, useContext, createContext } from "react";

const scratchContext = createContext();

export default function ScratcProvider({ children }) {
  const [money, setMoney] = useState(0);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    localStorage.getItem("money")
      ? setMoney(localStorage.getItem("money"))
      : localStorage.setItem("money", 50);
  }, []);

  const getMoney = () => {
    localStorage.getItem("money");
  };

  const setNewMoney = (amount) => {
    localStorage.setItem("money", Number(money) + Number(amount));
    setMoney(localStorage.getItem("money"));
  };

  const setNewTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const removeTicket = () => {
    setTickets((prev) => prev.slice(1));
  };

  const contextValues = {
    setNewMoney,
    getMoney,
    money: money,
    tickets: tickets,
    setNewTicket,
    removeTicket,
  };

  return (
    <scratchContext.Provider value={contextValues}>
      {children}
    </scratchContext.Provider>
  );
}

export const useScratch = () => useContext(scratchContext);
