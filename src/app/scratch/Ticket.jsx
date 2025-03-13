import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { useEffect, useState } from "react";
import { useScratch } from "../../contexts/ScratchContext";

export function Ticket({ id }) {
  const [result, setResult] = useState(0);
  const { money, setNewMoney, tickets } = useScratch();
  const [ticket, setTicket] = useState();

  useEffect(() => {
    setTicket(tickets[0]);
    let random = Math.random() * 100;
    let cumulative = 0;
    const calculWin = () => {
      for (const obj of ticket.winRate) {
        const [value, probability] = Object.entries(obj)[0];
        cumulative += probability;
        if (random < cumulative) {
          setResult(value);
          return;
        }
      }
    };
    calculWin();
  }, []);

  return (
    <div
      className="ticket"
      style={{
        backgroundImage: `linear-gradient(135deg, ${ticket.color}, ${ticket.subcolor})`,
      }}
    >
      <div className="ticket-vertical">
        <div className="ticket-marque">💰 Nexa Money ✨</div>
        <div className="ticket-name">{ticket.name}</div>
        <div className="ticket-price">{ticket.price}€</div>
      </div>
      <div className="ticket-horizon">
        <div className="ticket-desc">{ticket.description}</div>
        <div className="ticket-display">
          <ScratchToReveal
            width={400}
            height={350}
            onComplete={{}}
            minScratchPercentage={30}
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
            gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
          >
            <div className="text-9xl">{result}</div>
          </ScratchToReveal>
        </div>
        <div className="ticket-slide">💶💶💶</div>
        <div className="ticket-petittexte">
          Ce ticket est uniquement valable dans les points de vente agréés.
          Toute falsification ou altération entraîne la nullité du jeu. Les
          gains doivent être réclamés dans un délai de 60 jours à compter de la
          date d’achat. Voir règlement complet auprès de l’organisateur. Jeu
          interdit aux mineurs. Jouer comporte des risques : endettement,
          isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé)
          pour obtenir de l’aide.
        </div>
      </div>
    </div>
  );
}
