import { useEffect, useState, useContext, createContext } from "react";

const scratchContext = createContext();

export default function ScratcProvider({ children }) {
  const [money, setMoney] = useState(null);
  const [tickets, setTickets] = useState([]);

  const setNewMoney = (amount) => {
    setMoney((prev) => prev + amount);
  };

  const contextValues = {
    setNewMoney,
    money: money,
    tickets: tickets,
    setTickets: setTickets,
  };

  return (
    <scratchContext.Provider value={contextValues}>
      {children}
    </scratchContext.Provider>
  );
}

export const useScratch = () => useContext(scratchContext);
