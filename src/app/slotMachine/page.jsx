import { useEffect, useState } from "react";
import { confettiSideCannons } from "../../components/slotMachine/confetti";
import "./style.scss";

export default function SloteMachine() {
  
    const [resultat, setResultat] = useState(["?", "?", "?"]);
    const [hasWon, setHasWon] = useState(false);
    const [message, setMessage] = useState("gagne");

  const tableau = ["🍎", "🍌", "🍇", "🍒", "🍓", "🥝", "🥭", "🍊", "🍇", "🍈"];


  useEffect(() => {
    if (resultat[0] !== "?") {
      const resultat1 = document.querySelector(".resultat-1")
      const resultat2 = document.querySelector(".resultat-2")
      const resultat3 = document.querySelector(".resultat-3")
  
      if (resultat1) {resultat1.classList.add("animate")}
      if (resultat2) {resultat2.classList.add("animate")}
      if (resultat3) {resultat3.classList.add("animate")}
    
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
  
      if ((resultat[0] === resultat[1] || resultat[1] === resultat[2] || resultat[0] === resultat[2]) && resultat.length > 0 && resultat[0] !== "?") {
        setHasWon(true)
        setTimeout(() => {
          confettiSideCannons()
        }, 3000)
        console.log("object")
      } else {
        setHasWon(false)
      }
      

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
    <div className="flex flex-col items-center justify-center h-full w-full bg-green-600">
      <div className="w-[500px] h-[500px] fixed">
        <div className="slot-machine-container max-w-[500px] flex flex-col items-center justify-center h-full relative">
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
  // return (
  //   <div className="slot-machine-container flex flex-col items-center justify-center h-full">
  //     <div className="flex flex-row gap-2">
  //       <div className="numberResult">{resultat[0]}</div>
  //       <div className="numberResult">{resultat[1]}</div>
  //       <div className="numberResult">{resultat[2]}</div>
  //     </div>
  //     <div className="flex flex-col items-center justify-center">
  //       <p>{hasWon ? message : "perdu"}</p>
  //       <Button onClick={random}>Lancer</Button>
  //     </div>
  //   </div>
  // );
}
