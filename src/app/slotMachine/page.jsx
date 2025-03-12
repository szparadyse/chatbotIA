import { useEffect, useState } from "react";
import { confettiSideCannons } from "../../components/slotMachine/confetti";
import { Button } from "../../components/ui/button";
import "./style.scss";

export default function SloteMachine() {
  
    const [resultat, setResultat] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [message, setMessage] = useState("gagne");

  const tableau = ["🍎", "🍌", "🍇", "🍒", "🍓", "🥝", "🥭", "🍊", "🍇"];

  useEffect(() => {
    if ((resultat[0] === resultat[1] || resultat[1] === resultat[2] || resultat[0] === resultat[2]) && resultat.length > 0) {
      setHasWon(true)
      confettiSideCannons()
      console.log("object")
    } else {
      setHasWon(false)
    }
    
  }, [resultat])
  const random = () => {
  
    let tmp =[];
    for (let i = 0; i < 3; i++) {
      tmp.push(tableau[Math.floor(Math.random() * tableau.length)])
    }
    setResultat(tmp)


  }

  
  return (
    <div className="slot-machine-container flex flex-col items-center justify-center h-full">
      <div className="flex flex-row gap-2">
      
      <div className="numberResult">{resultat[0]}</div>
      <div className="numberResult">{resultat[1]}</div>
      <div className="numberResult">{resultat[2]}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{hasWon ? message : "perdu"}</p>
        <Button onClick={random}>Lancer</Button>
      </div>
    </div>
  );
}
