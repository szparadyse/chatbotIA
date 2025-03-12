import { useState } from "react";
import { skins } from "./settings.js";

export const LoadingPage = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState(null);
  const [rollingSkins, setRollingSkins] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Fonction pour tirer un skin selon les probabilités
  const getRandomSkin = () => {
    const weightedSkins = [];
    skins.forEach((skin) => {
      for (let i = 0; i < skin.chance; i++) {
        weightedSkins.push(skin);
      }
    });
    return weightedSkins[Math.floor(Math.random() * weightedSkins.length)];
  };

  // Fonction pour ouvrir la caisse avec effet roulette
  const openCrate = () => {
    if (isOpening) return;

    setIsOpening(true);
    setResult(null);
    setRollingSkins([]); // Reset animation

    let animationSteps = 20;
    let currentStep = 0;
    const interval = setInterval(() => {
      setRollingSkins((prev) => [
        ...prev.slice(-5),
        getRandomSkin(),
      ]);
      currentStep++;
      if (currentStep === animationSteps) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      const chosenSkin = getRandomSkin();
      setResult(chosenSkin);
      setInventory((prev) => [...prev, chosenSkin]);
      setIsOpening(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">CS:GO Nexa Simulateur</h1>

      {/* Roulette */}
      <div className="relative w-full h-64 bg-gray-700 overflow-hidden flex items-center justify-center border border-gray-500 rounded-lg">
        {rollingSkins.length > 0 ? (
          <div className="flex transition-transform duration-1000 ease-out">
            {rollingSkins.map((skin, index) => (
              <img key={index} src={skin.image} alt={skin.name} className="w-64 h-64 mx-10 object-cover" />
            ))}
          </div>
        ) : (
          
         
          <p className="text-gray-400"> <img src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsRVx4MwFo5_T3eAQ3i6DMIW0X7ojiwoHax6egMOKGxj4G68Nz3-jCp4itjFWx-ktqfSmtcwqVx6sT/360fx360f" alt="" /></p>
        )}
      </div>

      {/* Résultat */}
      {result && (
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold">
            Vous avez obtenu : <span className="text-yellow-400">{result.name}</span>
          </p>
          <img src={result.image} alt={result.name} className="w-64 h-64 mx-auto mt-4 border-4 border-yellow-500 rounded-lg shadow-lg" />
        </div>
      )}

      {/* Bouton ouverture */}
      <button
        className={`mt-8 px-6 py-2 text-lg font-semibold ${
          isOpening
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white rounded-lg transition-colors`}
        onClick={openCrate}
        disabled={isOpening}
      >
        {isOpening ? "Ouverture en cours..." : "Ouvrir la caisse"}
      </button>

      {/* Inventaire */}
      {inventory.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg w-80">
          <h2 className="text-lg font-bold">Inventaire</h2>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {inventory.map((skin, index) => (
              <img key={index} src={skin.image} alt={skin.name} className="w-16 h-16 border border-gray-500 rounded-md object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};