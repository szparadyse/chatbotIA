import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

export default function CasinoRoulette() {
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

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎰 Roulette de Casino</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        innerRadius={30} // Ajuste la taille du cercle intérieur
        outerBorderWidth={6} // Bordure externe pour l’effet réaliste
        onStopSpinning={() => setMustSpin(false)}
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
    </div>
  );
}
