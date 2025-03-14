import { useEffect, useRef, useState } from "react";
import machineBody from "../../assets/slotmachine/machineBody.png";
import jackpot from "../../assets/slotmachine/song/jackpot.mp3";
import spinning from "../../assets/slotmachine/song/spinning.mp3";
import spinButton from "../../assets/slotmachine/spin-btn.png";
import { confettiSideCannons } from "../../components/slotMachine/confetti";
import MiseSelector from "../../components/slotMachine/miseSelector";
import "./style.scss";

export default function SloteMachine() {
  const [resultat, setResultat] = useState(["?", "?", "?"]);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState("gagne");
  const [isSpinning, setIsSpinning] = useState(false);
  const [audioSpinning] = useState(new Audio(spinning));
  const [audioWin] = useState(new Audio(jackpot));
  const yellowLed = useRef(null);
  const [isYellowLed, setIsYellowLed] = useState(false);

  const tableau = ["🍎", "🍌", "🍇", "🍒", "🍓", "🥝", "🥭", "🍊", "🍇", "🍈"];
  const tableauDesMises = [1, 5, 10, 25, 50, 100];
  
  const [mise, setMise] = useState(tableauDesMises[0]);

  useEffect(() => {
    yellowLed.current = document.querySelector(".yellow-led");
  }, []);

  useEffect(() => {
    if (resultat[0] !== "?" && !isSpinning) {
      audioSpinning.currentTime = 0;
      audioSpinning.play();
      setIsSpinning(true);
      const resultat1 = document.querySelector(".resultat-1");
      const resultat2 = document.querySelector(".resultat-2");
      const resultat3 = document.querySelector(".resultat-3");

      if (resultat1) {
        resultat1.classList.add("animate");
      }
      if (resultat2) {
        resultat2.classList.add("animate");
      }
      if (resultat3) {
        resultat3.classList.add("animate");
      }

      setTimeout(() => {
        setTimeout(() => {
          resultat1.classList.remove("animate");
          console.log("class supprimée");
        }, 1000);
        setTimeout(() => {
          resultat2.classList.remove("animate");
          console.log("class 2 supprimée");
        }, 2000);

        setTimeout(() => {
          resultat3.classList.remove("animate");
          console.log("class 3 supprimée");
        }, 3000);
      }, 500);

      if (
        (resultat[0] === resultat[1] ||
          resultat[1] === resultat[2] ||
          resultat[0] === resultat[2]) &&
        resultat.length > 0 &&
        resultat[0] !== "?"
      ) {
        setHasWon(true);
        setTimeout(() => {
          audioWin.play();
          setTimeout(() => {
            confettiSideCannons();
            handleYellowLed();
          }, 500);
          setIsSpinning(false);
        }, 3000);
      } else {
        setHasWon(false);
        setIsSpinning(false);
      }
    }
  }, [resultat]);

  const handleYellowLed = () => {
    let count = 0; // Nombre de clignotements
    const interval = setInterval(() => {
      if (yellowLed.current) {
        yellowLed.current.style.display =
          yellowLed.current.style.display === "none" ? "block" : "none";
      }
      count++;
      if (count === 14) {
        // Après 4 changements (clignotements)
        clearInterval(interval);
        if (yellowLed.current) yellowLed.current.style.display = "none"; // Assure qu'elle reste éteinte à la fin
      }
    }, 100);
  };

  const random = () => {
    if (isSpinning) return;
    let tmp = [];
    for (let i = 0; i < 3; i++) {
      tmp.push(tableau[Math.floor(Math.random() * tableau.length)]);
    }
    setResultat(tmp);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full container`}
    >
      <div className="w-[500px] h-[500px] fixed">
        <div className="slot-machine-container max-w-[500px] flex flex-col items-center justify-center h-full relative">
          <div className="absolute w-10 h-10 bg-red-500 z-20 rounded-t-3xl yellow-led"></div>
          <img src={machineBody} alt="" draggable="false" className="z-10" />
          <div className="body-result">
            <div className="numberResult resultat-1">{resultat[0]}</div>
            <div className="numberResult resultat-2">{resultat[1]}</div>
            <div className="numberResult resultat-3">{resultat[2]}</div>
          </div>
          <img
            src={spinButton}
            alt=""
            className="absolute btn-spin"
            draggable="false"
            onClick={random}
          />
          <MiseSelector tableauDesMises={tableauDesMises}  setMise={setMise} mise={mise}/>
        </div>
      </div>
    </div>
  );
}
