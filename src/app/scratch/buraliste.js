export const propalByBuraliste = [
  {
    id: 1,
    name: "Banco",
    description:
      "Un classique rapide à 1€, avec un gain potentiel jusqu'à 50€.",
    winRate: [{ 1: 20 }, { 2: 10 }, { 5: 5 }, { 50: 1 }],
    color: "#FFD700", // Or
    subcolor: "#FF8C00", // Orange foncé
  },
  {
    id: 2,
    name: "Cash",
    description: "Un jeu à 5€ qui peut vous rapporter jusqu'à 500 000€.",
    winRate: [{ 5: 15 }, { 10: 8 }, { 100: 2 }, { 500000: 0.001 }],
    color: "#008000", // Vert
    subcolor: "#006400", // Vert foncé
  },
  {
    id: 3,
    name: "X20",
    description:
      "Un ticket à 5€ avec des multiplicateurs allant jusqu'à 20 fois votre mise.",
    winRate: [{ 5: 12 }, { 20: 6 }, { 100: 3 }, { 10000: 0.5 }],
    color: "#4169E1", // Bleu royal
    subcolor: "#1E90FF", // Bleu clair
  },
  {
    id: 4,
    name: "Millionnaire",
    description:
      "Un ticket à 10€ qui vous offre une chance de gagner 1 million d’euros.",
    winRate: [{ 10: 10 }, { 50: 5 }, { 500: 1 }, { 1000000: 0.0001 }],
    color: "#B22222", // Rouge foncé
    subcolor: "#8B0000", // Rouge intense
  },
  {
    id: 5,
    name: "Jackpot",
    description: "Un jeu à 3€ avec une cagnotte maximale de 50 000€.",
    winRate: [{ 3: 18 }, { 15: 9 }, { 1000: 2 }, { 50000: 0.05 }],
    color: "#9400D3", // Violet foncé
    subcolor: "#800080", // Violet
  },
];
