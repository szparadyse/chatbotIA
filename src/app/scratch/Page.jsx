import React, { useEffect, useState } from "react";
import "./style.css";
import { Ticket } from "./Ticket";
import { propalByBuraliste } from "./buraliste";
import imgBuraliste from "../../assets/bualiste.webp";
import { Image } from "lucide-react";

export function Scratch() {
  const [money, setMoney] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [atBuraliste, setAtBuraliste] = useState(true);

  return (
    <div className="scratch-container">
      {atBuraliste ? (
        <div className="flexcentercolumn">
          <img src={imgBuraliste} width="400" height="500" />
          <div className="flexcenter">
            {propalByBuraliste.map((t) => {
              return (
                <div className="tick-buraliste">
                  <h1>{t.name}</h1>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No</div>
      )}
    </div>
  );
}
