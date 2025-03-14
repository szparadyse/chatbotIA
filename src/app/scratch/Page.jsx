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
import musicburaliste from "../../assets/musicburaliste.mp3";
import { useScratch } from "../../contexts/ScratchContext";
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { useAuth } from "../../contexts/authContext";

export function Scratch() {
  const { tickets, setNewTicket } = useScratch();
  const { wallet, updateWallet } = useAuth();
  const [atBuraliste, setAtBuraliste] = useState(true);
  const [phraseBuraliste, setPhraseBuraliste] = useState("");
  const [imgBuraliste, setImgBuraliste] = useState(null);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);

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
    if (wallet >= t.price) {
      setNewTicket(t);
      setPhraseBuraliste(`Bien sûr! Voici votre ${t.name}.`);
      updateWallet(-1 * t.price);
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
    newAudio.volume = volume;
    newAudio.play();
    setAudio(newAudio);
  };

  const timeToScratch = () => {
    play(dorkus);
    setAtBuraliste(false);
  };

  const timeToBuy = () => {
    play(bell);
    setTimeout(() => {}, 200);
    play(musicburaliste);
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

            <TypingAnimation className="phraseBuraliste" duration={40}>
              {phraseBuraliste}
            </TypingAnimation>

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
          <div className="flexcentercolumn">
            <Ticket />
          </div>
        )}
      </div>
      <div className="overlay">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <div className="flexcentercolumn maxWidth">
          {tickets.map((t) => (
            <motion.div
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
