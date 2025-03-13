import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { useEffect, useState } from "react";
import { useScratch } from "../../contexts/ScratchContext";
import { Button } from "@/components/ui/button";
import yeuxrouge from "../../assets/yeuxrouge.webp";
import trash from "../../assets/trash.webp";

export function Ticket() {
  const [result, setResult] = useState(0);
  const { setNewMoney, tickets, removeTicket } = useScratch();
  const [ticket, setTicket] = useState(tickets[0]);
  const [victory, setVictory] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    calculWin();
  }, []);

  const majTicket = () => {
    setTicket(tickets[0]);
  };

  const calculWin = () => {
    let random = Math.random() * 100; // Utilisation d'une variable locale
    let cumulative = 0;
    for (const obj of ticket.winRate) {
      const [value, probability] = Object.entries(obj)[0];
      cumulative += probability;
      if (random < cumulative) {
        setResult(Number(value)); // S'assurer que la valeur est bien un nombre
        return;
      }
    }
    setResult(0); // Si aucun gain n'a été trouvé
  };

  const afterPlay = () => {
    if (result > 0) {
      setNewMoney(result);
      setPlaying(false);
      setVictory(true);
    } else {
      setPlaying(false);
      setVictory(false);
    }
    removeTicket(0);
  };

  const rematch = () => {
    majTicket();
    setPlaying(true);
    setVictory(false);
    calculWin();
  };

  const play = (e) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(e);
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <>
      {tickets.length > 0 ? (
        <>
          {!playing ? (
            <>
              {victory ? (
                <div
                  style={{ backgroundImage: `url(${yeuxrouge})` }}
                  onClick={rematch}
                  className="allscreen"
                >
                  <span className="size120 animate-pulse text-yellow-400 drop-shadow-[0_0_10px_rgba(255,223,0,0.8)]">
                    ✨ + {result}€ ✨
                  </span>
                  <span className="size120 animate-pulse text-yellow-400 drop-shadow-[0_0_10px_rgba(255,223,0,0.8)]">
                    Victoire ...
                  </span>
                </div>
              ) : (
                <div
                  style={{ backgroundImage: `url(${trash})` }}
                  onClick={rematch}
                  className="allscreen"
                >
                  La prochaine sera la bonne ...
                </div>
              )}
            </>
          ) : (
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
                    onComplete={afterPlay}
                    minScratchPercentage={15}
                    className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
                    gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
                  >
                    <div className="text-9xl">{result}€</div>
                  </ScratchToReveal>
                </div>
                <div className="ticket-slide">💶💶💶</div>
                <div className="ticket-petittexte">
                  Ce ticket est uniquement valable dans les points de vente
                  agréés. Toute falsification ou altération entraîne la nullité
                  du jeu. Les gains doivent être réclamés dans un délai de 60
                  jours à compter de la date d’achat. Voir règlement complet
                  auprès de l’organisateur. Jeu interdit aux mineurs. Jouer
                  comporte des risques : endettement, isolement, dépendance.
                  Appelez le 09 74 75 13 13 (appel non surtaxé) pour obtenir de
                  l’aide.
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flexcenter">Vous n'avez plus aucun ticket ....</div>
      )}
    </>
  );
}
