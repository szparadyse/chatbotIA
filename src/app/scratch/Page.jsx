import React, { useEffect, useState } from "react";
import "./style.css";
import { Ticket } from "./Ticket";
import { propalByBuraliste } from "./buraliste";
import buralistepere from "../../assets/buralistepere.webp";
import buralistefils from "../../assets/buralistefils.webp";
import buralistefille from "../../assets/buralistefille.webp";
import { motion } from "motion/react";
import bell from "../../assets/bell.wav";
import dorkus from "../../assets/Dorkus64.mp3";
import { useScratch } from "../../contexts/ScratchContext";

export function Scratch() {
  const [money, setMoney] = useState(10000);
  const { tickets, setTickets } = useScratch();
  const [atBuraliste, setAtBuraliste] = useState(true);
  const [phraseBuraliste, setPhraseBuraliste] = useState("");
  const [imgBuraliste, setImgBuraliste] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const randomBuraliste = () => {
      let random = Math.random();
      switch (true) {
        case random < 0.333:
          setPhraseBuraliste(
            "Bonjour jeune homme, qu'est ce qu'il vous faut aujourd'hui?"
          );
          setImgBuraliste(<img src={buralistepere} width="400" height="500" />);
          break;
        case random < 0.666:
          setPhraseBuraliste("Salut frérot! Tu vas bien ? Je te mets quoi?");

          setImgBuraliste(<img src={buralistefils} width="400" height="500" />);
          break;
        default:
          setPhraseBuraliste(
            "Bonsoir Monsieur... Il vous faut quelque chose ...?"
          );
          setImgBuraliste(
            <img src={buralistefille} width="400" height="500" />
          );
      }
    };
    randomBuraliste();
  }, [atBuraliste]);

  const buyTicket = (t, e) => {
    if (money > t.price) {
      setTickets((prev) => [...prev, t]);
      setPhraseBuraliste(`Bien sûr! Voici votre ${t.name}.`);
      setMoney((prev) => prev - t.price);
    } else {
      setPhraseBuraliste(`Monsieur, revenez quand vous aurez de quoi payer !!`);
    }
  };

  const play = (e) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(e);
    newAudio.play();
    setAudio(newAudio);
  };

  const timeToScratch = () => {
    play(dorkus);
    setAtBuraliste(false);
  };

  const timeToBuy = () => {
    play(bell);
    setAtBuraliste(true);
  };

  return (
    <div className="scratch-container">
      <div className="maincontainer">
        <div className="navbar">
          <motion.div
            className="buttonNav"
            onClick={() => {
              timeToBuy();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Chez le buraliste
          </motion.div>{" "}
          <motion.div
            className="buttonNav"
            onClick={() => {
              timeToScratch();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Gratter les tickets
          </motion.div>
        </div>
        {atBuraliste ? (
          <div className="flexcentercolumn">
            {imgBuraliste}
            <p className="phraseBuraliste">{phraseBuraliste}</p>
            <div className="flexcenter">
              {propalByBuraliste.map((t) => {
                return (
                  <motion.div
                    key={t.id}
                    className="tick-buraliste"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${t.color}, ${t.subcolor})`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => buyTicket(t)}
                  >
                    <div className="flexcentercolumn">
                      <h1>{t.name}</h1>
                      <h2>{t.price}€</h2>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <Ticket />
        )}
      </div>
      <div className="overlay">
        <div className="displayMoney">{money}€</div>
        <div className="flexcentercolumn maxWidth">
          {tickets.map((t) => (
            <motion.div
              key={t.id}
              className="tick-buraliste"
              style={{
                backgroundImage: `linear-gradient(135deg, ${t.color}, ${t.subcolor})`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => timeToScratch(t)}
            >
              <h1>{t.name}</h1>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
