import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "./ui/button";
import { confettiSideCannons } from "./slotMachine/confetti";

export default function CasinoRoulette() {
  const [pair, setPair] = useState(0); // 0 pair 1 impair
  const [mise, setMise] = useState(0);
  const [tab, setTab] = useState([0, 0, 0, 0, 0]);
  const [nonVide, setnonVide] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winningNumber, setWinningNumber] = useState(null); // Stocke le numéro gagnant
  const [color, setColor] = useState(0); // 0 = rouge ; 1 = noir
  const [num, setNum] = useState(0);
  const [half, setHalf] = useState(0); // 0 = 1-18; 1 = 19-36;
  const [tier, setTier] = useState(0); // 0= 1-12; 1 = 13-24; 2 = 25-36
  const [winningColor, setWinningcolor] = useState("");
  const [inputValue, setInputValue] = useState(0);

  function ajouterMise(e) {
    const valeur = e.target.getAttribute("data");
    if (mise + valeur >= 0) {
      setMise((prev) => prev + parseInt(valeur));
    } else toast.error("Pas de mise négative");
  }

  function verifTab() {
    let table = [];
    for (let i = 1; i < tab.length; i++) {
      if (tab[i] > 0) {
        switch (i) {
          case 1: // mise couleur
            if (color == winningColor) {
              //cagnotte += mise * 2;
              confettiSideCannons();
              console.log("WIIIIIIN");
            }

          case 2: // nombre exact
            if (num == winningNumber) {
              //cagnotte += mise * 36;
              confettiSideCannons();
              console.log("WIIIIIIN");
            }

          case 3: // mise tier
            switch (tier) {
              case 1:
                if (winningNumber <= 12 && winningNumber == 0) {
                  //cagnotte += mise * 3;
                  confettiSideCannons();
                  console.log("WIIIIIIN");
                }

              case 2:
                if (winningNumber > 12 && winningNumber <= 24) {
                  //console += mise * 3;
                  confettiSideCannons();
                  console.log("WIIIIIIN");
                }

              case 3:
                if (
                  winningNumber > 24 &&
                  winningNumber <= 36 &&
                  winningNumber
                ) {
                  //cagnotte += mise * 3;
                  confettiSideCannons();
                  console.log("WIIIIIIN");
                }
            }

          case 4: //pair
            if (winningNumber == 0) {
              //règle prison
            } else if (winningNumber % 2 == 0 && pair == 0) {
              confettiSideCannons();
              console.log("WIIIIIIN");
              //cagnotte += mise*2
            } else if (winningNumber % 2 == 1 && pair == 1) {
              confettiSideCannons();
              console.log("WIIIIIIN");
              //cagnotte += mise * 2;
            }

          case 5: // mise half
            if (winningNumber == 0) {
              //règle prison
            } else if (winningNumber < 19 && half == 0) {
              //cagnotte += mise * 2;
              confettiSideCannons();
              console.log("WIIIIIIN");
            } else if (winningNumber > 18 && half == 1) {
              //cagnotte += mise * 2;
              confettiSideCannons();
              console.log("WIIIIIIN");
            }
        }
      }
    }
  }
  useEffect(() => {
    if (nonVide == true) {
      verifTab();
      setnonVide(false);
      setMise(0);
      let table;
      table = tab;
      for (let i = 1; i < tab.length; i++) {
        table[i] = 0;
      }
      setTab(table);
    }
  }, [winningNumber]);

  const data = [
    { option: "0", style: { backgroundColor: "green", textColor: "white" } },
    { option: "32", style: { backgroundColor: "red", textColor: "white" } },
    { option: "15", style: { backgroundColor: "black", textColor: "white" } },
    { option: "19", style: { backgroundColor: "red", textColor: "white" } },
    { option: "4", style: { backgroundColor: "black", textColor: "white" } },
    { option: "21", style: { backgroundColor: "red", textColor: "white" } },
    { option: "2", style: { backgroundColor: "black", textColor: "white" } },
    { option: "25", style: { backgroundColor: "red", textColor: "white" } },
    { option: "17", style: { backgroundColor: "black", textColor: "white" } },
    { option: "34", style: { backgroundColor: "red", textColor: "white" } },
    { option: "6", style: { backgroundColor: "black", textColor: "white" } },
    { option: "27", style: { backgroundColor: "red", textColor: "white" } },
    { option: "13", style: { backgroundColor: "black", textColor: "white" } },
    { option: "36", style: { backgroundColor: "red", textColor: "white" } },
    { option: "11", style: { backgroundColor: "black", textColor: "white" } },
    { option: "30", style: { backgroundColor: "red", textColor: "white" } },
    { option: "8", style: { backgroundColor: "black", textColor: "white" } },
    { option: "23", style: { backgroundColor: "red", textColor: "white" } },
    { option: "10", style: { backgroundColor: "black", textColor: "white" } },
    { option: "5", style: { backgroundColor: "red", textColor: "white" } },
    { option: "24", style: { backgroundColor: "black", textColor: "white" } },
    { option: "16", style: { backgroundColor: "red", textColor: "white" } },
    { option: "33", style: { backgroundColor: "black", textColor: "white" } },
    { option: "1", style: { backgroundColor: "red", textColor: "white" } },
    { option: "20", style: { backgroundColor: "black", textColor: "white" } },
    { option: "14", style: { backgroundColor: "red", textColor: "white" } },
    { option: "31", style: { backgroundColor: "black", textColor: "white" } },
    { option: "9", style: { backgroundColor: "red", textColor: "white" } },
    { option: "22", style: { backgroundColor: "black", textColor: "white" } },
    { option: "18", style: { backgroundColor: "red", textColor: "white" } },
    { option: "29", style: { backgroundColor: "black", textColor: "white" } },
    { option: "7", style: { backgroundColor: "red", textColor: "white" } },
    { option: "28", style: { backgroundColor: "black", textColor: "white" } },
    { option: "12", style: { backgroundColor: "red", textColor: "white" } },
    { option: "35", style: { backgroundColor: "black", textColor: "white" } },
    { option: "3", style: { backgroundColor: "red", textColor: "white" } },
    { option: "26", style: { backgroundColor: "black", textColor: "white" } },
  ];

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  return (
    <div className="flex justify-around w-full">
      <div className=" flex flex-col items-around gap-4">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          innerRadius={30} // Ajuste la taille du cercle intérieur
          outerBorderWidth={6} // Bordure externe pour l’effet réaliste
          onStopSpinning={() => {
            setMustSpin(false);
            setWinningNumber(data[prizeNumber].option); // Stocke le numéro gagné
            setWinningcolor(data[prizeNumber].style.backgroundColor); //stocke la couleur
          }}
        />

        <Button disabled={mustSpin} onClick={handleSpinClick} className="">
          Spin
        </Button>

        <div className="flex gap-4 items-center">
          <Button onClick={ajouterMise} data={-100}>
            -100
          </Button>
          <Button onClick={ajouterMise} data={-10}>
            -10
          </Button>
          <Button onClick={ajouterMise} data={-1}>
            -1
          </Button>
          <span>Mise actuelle : {mise}</span>
          <Button onClick={ajouterMise} data={1}>
            +1
          </Button>
          <Button onClick={ajouterMise} data={10}>
            +10
          </Button>
          <Button onClick={ajouterMise} data={100}>
            +100
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col ">
          <input
            type="number"
            id="numero"
            name="numero"
            max="36"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[2] = mise;
              setTab(table);
              setNum(inputValue);
              setnonVide(true);
            }}
          >
            miser sur {inputValue}
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[4] = mise;
              setTab(table);
              setPair(1);
              setnonVide(true);
            }}
          >
            miser impair
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[4] = mise;
              setTab(table);
              setPair(0);
              setnonVide(true);
            }}
          >
            miser pair
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[3] = mise;
              setTab(table);
              setTier(0);
              setnonVide(true);
            }}
          >
            miser 1st Tier (1-12)
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[3] = mise;
              setTab(table);
              setTier(1);
              setnonVide(true);
            }}
          >
            miser 2nd Tier (13-24)
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[3] = mise;
              setTab(table);
              setTier(0);
              setnonVide(true);
            }}
          >
            miser 3rd Tier (25-36)
          </Button>

          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[1] = mise;
              setTab(table);
              setColor("red");
              setnonVide(true);
            }}
          >
            miser sur rouge
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[1] = mise;
              setTab(table);
              setColor("black");
              setnonVide(true);
            }}
          >
            miser sur noir
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[5] = mise;
              setTab(table);
              setHalf(0);
              setnonVide(true);
            }}
          >
            mise 1st half (1-18)
          </Button>
          <Button
            disabled={mustSpin}
            onClick={() => {
              let table = tab;
              table[5] = mise;
              setTab(table);
              setHalf(1);
              setnonVide(true);
            }}
          >
            mise 2nd half (19-36)
          </Button>
        </div>
      </div>
      {/* Affichage du résultat après le spin */}
      {winningNumber !== null && (
        <h3 style={{ marginTop: "20px", fontSize: "24px", color: "green" }}>
          Le numéro gagnant est : <strong>{winningNumber}</strong>
        </h3>
      )}
    </div>
  );
}
