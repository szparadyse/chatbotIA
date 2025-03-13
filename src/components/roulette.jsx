import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { toast, ToastContainer } from "react-toastify";

export default function CasinoRoulette() {
  const [pair, setPair] = useState(0);
  const [mise, setMise] = useState(0);
  let color = 0;
  let num = 0;
  let half = 0;
  const [tab, setTab] = useState([0, 0, 0, 0, 0]);
  const [nonVide, setnonVide] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winningNumber, setWinningNumber] = useState(null); // Stocke le numéro gagnant

  function ajouterMise(e) {
    const valeur = e.target.getAttribute("data");
    setMise((prev) => prev + parseInt(valeur));
  }
  function miseCouleur(color, result, mise) {
    if (color == result) {
      return mise * 2;
    } else return 0;
  }

  function miseExact(num, result, mise) {
    if (num == result) {
      return mise * 36;
    } else return 0;
  }

  function miseTier(tier, result, mise) {
    switch (tier) {
      case 1:
        if (result <= 12 && result == 0) {
          return mise * 3;
        } else return 0;

      case 2:
        if (result > 12 && result <= 24) {
          return mise * 3;
        } else return 0;

      case 3:
        if (result > 24 && result <= 36 && result) {
          return mise * 3;
        } else return 0;
    }
  }

  function misePair(pair, result, mise) {
    if (result == 0) {
      return 0;
    } else if (result % 2 == 0 && pair == 0) {
      toast("WIIIIIIN");
      console.log("WIIIIIIN");
      return mise * 2;
    } else if (result % 2 == 1 && pair == 1) {
      toast("WIIIIIIN");
      console.log("WIIIIIIN");
      return mise * 2;
    } else return 0;
  }

  function miseHalf(half, result, mise) {
    if (result == 0) {
      return 0;
    } else if (result < 19 && half == 0) {
      return mise * 2;
    } else if (result > 18 && half == 1) {
      return mise * 2;
    } else return 0;
  }

  function verifTab() {
    let table = [];
    for (let i = 1; i < tab.length; i++) {
      if (tab[i] > 0) {
        switch (i) {
          case 1:
            miseCouleur(color, winningNumber, tab[i]);
            table = tab;
            table[1] = 0;
            setTab(table);

          case 2:
            miseExact(num, winningNumber, tab[i]);
            table = tab;
            table[2] = 0;
            setTab(table);

          case 3:
            miseTier(tier, winningNumber, tab[i]);
            table = tab;
            table[3] = 0;
            setTab(table);
          case 4:
            misePair(pair, winningNumber, tab[i]);
            table = tab;
            table[4] = 0;
            setTab(table);

          case 5:
            miseHalf(half, winningNumber, tab[i]);
        }
      }
    }
  }
  useEffect(() => {
    if (nonVide == true) {
      verifTab();
      setnonVide(false);
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ToastContainer />
      <h2>🎰 Roulette de Casino</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        innerRadius={30} // Ajuste la taille du cercle intérieur
        outerBorderWidth={6} // Bordure externe pour l’effet réaliste
        onStopSpinning={() => {
          setMustSpin(false);
          setWinningNumber(data[prizeNumber].option); // Stocke le numéro gagné
        }}
      />
      <button
        onClick={handleSpinClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        🎲 Tourner la Roulette
      </button>
      <h3>{mise}</h3>
      <button
        onClick={ajouterMise}
        data={1}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        +1
      </button>
      <button
        onClick={ajouterMise}
        data={10}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        +10
      </button>
      <button
        onClick={ajouterMise}
        data={100}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          let table = tab;
          table[4] = mise;
          setTab(table);
          setPair(1);
          setnonVide(true);
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        miser impair
      </button>
      <button
        onClick={() => {
          let table = tab;
          table[4] = mise;
          setTab(table);
          setPair(0);
          setnonVide(true);
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          background: "gold",
          color: "black",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        miser pair
      </button>

      {/* Affichage du résultat après le spin */}
      {winningNumber !== null && (
        <h3 style={{ marginTop: "20px", fontSize: "24px", color: "green" }}>
          ✅ Le numéro gagnant est : <strong>{winningNumber}</strong>
        </h3>
      )}
    </div>
  );
}
