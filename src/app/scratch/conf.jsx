"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiParty() {
  useEffect(() => {
    const scalar = 2;

    const unicorn = confetti.shapeFromText({ text: "💸", scalar });
    const star = "star";
    const circle = "circle";
    const triangle = confetti.shapeFromPath({ path: "M0 10 L5 0 L10 10z" });
    const square = confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
    });
    const coin = confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
    });
    const tree = confetti.shapeFromPath({ path: "M5 0 L10 10 L0 10 Z" });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      scalar,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 50, shapes: [unicorn, star] });
      confetti({
        ...defaults,
        particleCount: 30,
        shapes: [triangle, square, coin, tree],
      });
      confetti({
        ...defaults,
        particleCount: 20,
        scalar: scalar / 2,
        shapes: [circle],
      });
    };

    // Lancement des confettis en boucle toutes les 500ms
    const interval = setInterval(shoot, 500);

    return () => clearInterval(interval); // Nettoyage à la suppression du composant
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none" />
  );
}
