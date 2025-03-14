import { useState, useRef } from "react";
import { skins } from "./settings.js";

export const LoadingPage = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState(null);
  const [rollingSkins, setRollingSkins] = useState([]);
  const [inventory, setInventory] = useState([]);
  const containerRef = useRef(null);

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

  const openCrate = () => {
    if (isOpening) return;
    setIsOpening(true);
    setResult(null);

    // 1. Déterminer le skin gagnant
    const winningSkin = getRandomSkin();

    // 2. Créer le tableau de skins (20 aléatoires + le gagnant)
    const totalRandomSkins = 20;
    const animationSkins = [];
    for (let i = 0; i < totalRandomSkins; i++) {
      animationSkins.push(getRandomSkin());
    }
    animationSkins.push(winningSkin); 
    // Le gagnant sera donc à l'index "totalRandomSkins" (20)

    setRollingSkins(animationSkins);

    // 3. Une fois que React a rendu les images, on calcule la translation
    //    On met un setTimeout(0) (ou requestAnimationFrame) pour attendre le rendu.
    setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // On récupère la bounding box du conteneur
      const containerRect = container.getBoundingClientRect();

      // Le skin gagnant est le dernier dans le tableau => index = totalRandomSkins
      const finalItem = container.children[totalRandomSkins];
      if (!finalItem) return;

      // On récupère la bounding box du skin gagnant
      const finalRect = finalItem.getBoundingClientRect();

      // Calcul de l'offset :
      //  - centre du skin gagnant : (finalRect.left + finalRect.width/2)
      //  - centre du conteneur : (containerRect.left + containerRect.width/2)
      // L'offset = distance entre ces deux centres
      const offset =
        (finalRect.left + finalRect.width / 2) -
        (containerRect.left + containerRect.width / 2);

      // On applique la transition pour déplacer le conteneur
      container.style.transition = "transform 3s ease-out";
      container.style.transform = `translateX(-${offset}px)`;
    }, 0);

    // 4. Quand l'animation est terminée (3s), on affiche le résultat et on réinitialise
    setTimeout(() => {
      setResult(winningSkin);
      setInventory((prev) => [...prev, winningSkin]);
      setIsOpening(false);

      // Réinitialiser la transformation pour la prochaine ouverture
      if (containerRef.current) {
        containerRef.current.style.transition = "";
        containerRef.current.style.transform = "";
      }
    }, 3000); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <img src="https://digital-games.hauts-de-seine.fr/wp-content/uploads/2025/01/nexa.png" alt="" className="w-1/4" />

      {/* Conteneur de la roulette */}
      <div className="relative w-full h-64 bg-gray-700 overflow-hidden flex items-center justify-center border border-gray-500 rounded-lg">
        {/* Indicateur (flèche) au centre */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-yellow-500"></div>
        </div>

        {/* Liste des skins qui défilent */}
        <div ref={containerRef} className="flex">
          {rollingSkins.length > 0 ? (
            rollingSkins.map((skin, index) => (
              <img
                key={index}
                src={skin.image}
                alt={skin.name}
                className="w-64 h-64 mx-10 object-cover"
              />
            ))
          ) : (
            <p className="text-gray-400">Aucun skin en cours</p>
          )}
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold">
            Vous avez obtenu : <span className="text-yellow-400">{result.name}</span>
          </p>
          <img
            src={result.image}
            alt={result.name}
            className="w-64 h-64 mx-auto mt-4 border-4 border-yellow-500 rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Bouton d'ouverture */}
      <button
        className={`mt-8 px-6 py-2 text-lg font-semibold ${
          isOpening ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
              <img
                key={index}
                src={skin.image}
                alt={skin.name}
                className="w-16 h-16 border border-gray-500 rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};