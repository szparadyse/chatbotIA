import { useEffect, useRef, useState } from "react";
import { confettiSideCannons } from "../../components/slotMachine/confetti";
import "./style.scss";

export default function SloteMachine() {
  
    const [resultat, setResultat] = useState(["?", "?", "?"]);
    const [hasWon, setHasWon] = useState(false);
    const [message, setMessage] = useState("gagne");
    const [isSpinning, setIsSpinning] = useState(false);
    const [audioSpinning] = useState(new Audio("../../../public/song/spinning.mp3"));
    const [audioWin] = useState(new Audio("../../../public/song/jackpot.mp3"));
    const yellowLed = useRef(null);
    const [isYellowLed, setIsYellowLed] = useState(false);

  const tableau = ["🍎", "🍌", "🍇", "🍒", "🍓", "🥝", "🥭", "🍊", "🍇", "🍈"];

  useEffect(() => {
    yellowLed.current = document.querySelector(".yellow-led");
  }, []);


  useEffect(() => {
    if (resultat[0] !== "?" && !isSpinning) {
      audioSpinning.currentTime = 0; 
      audioSpinning.play()
      setIsSpinning(true);
      const resultat1 = document.querySelector(".resultat-1")
      const resultat2 = document.querySelector(".resultat-2")
      const resultat3 = document.querySelector(".resultat-3")
  
      if (resultat1) {resultat1.classList.add("animate")}
      if (resultat2) {resultat2.classList.add("animate")}
      if (resultat3) {resultat3.classList.add("animate")}
      
      setTimeout(() => {
        setTimeout(() => {
          resultat1.classList.remove("animate")
          console.log('class supprimée');
        }, 1000)
        setTimeout(() => {
          resultat2.classList.remove("animate")
          console.log('class 2 supprimée');
        }, 2000)
    
        setTimeout(() => {
          resultat3.classList.remove("animate")
          console.log('class 3 supprimée');
        }, 3000)

      }, 500)
  
      if ((resultat[0] === resultat[1] || resultat[1] === resultat[2] || resultat[0] === resultat[2]) && resultat.length > 0 && resultat[0] !== "?") {
        setHasWon(true)
        setTimeout(() => {
          audioWin.play()
          setTimeout(() => {
            confettiSideCannons()
            handleYellowLed()
          }, 500)
          setIsSpinning(false)
        }, 3000)
      } else {
        setHasWon(false)
        setIsSpinning(false)
      }
      

    }
  }, [resultat])

  const handleYellowLed = () => {
    let count = 0; // Nombre de clignotements
    const interval = setInterval(() => {
      if (yellowLed.current) {
        yellowLed.current.style.display = yellowLed.current.style.display === "none" ? "block" : "none";
      }
      count++;
      if (count === 14) { // Après 4 changements (clignotements)
        clearInterval(interval);
        if (yellowLed.current) yellowLed.current.style.display = "none"; // Assure qu'elle reste éteinte à la fin
      }
    }, 100);
  }

  const random = () => {
    if (isSpinning) return;
    let tmp =[];
    for (let i = 0; i < 3; i++) {
      tmp.push(tableau[Math.floor(Math.random() * tableau.length)])
    }
    setResultat(tmp)


  }

  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[url('../../../public/bg-slot-machine.webp')] bg-cover bg-center">
      <div className="w-[500px] h-[500px] fixed">
        <div className="slot-machine-container max-w-[500px] flex flex-col items-center justify-center h-full relative">
          <div className="absolute w-10 h-10 bg-red-500 z-20 rounded-t-3xl yellow-led"></div>
          <img src="../../../public/machineBody.png" alt="" draggable="false" className="z-10" />
          <div className="body-result">
            <div className="numberResult resultat-1">{resultat[0]}</div>
            <div className="numberResult resultat-2">{resultat[1]}</div>
            <div className="numberResult resultat-3">{resultat[2]}</div>
          </div>
          <img src="../../../public/spin-btn.png" alt="" className="absolute btn-spin" draggable="false" onClick={random}/>
        </div>
      </div>
    </div>
  );
}
