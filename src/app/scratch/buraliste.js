export const propalByBuraliste = [
  {
    id: 1,
    name: "Banco",
    description:
      "Un classique rapide à 1€, avec un gain potentiel jusqu'à 5 000€.",
    winRate: [
      { 1: 26.04 }, // 1 chance sur 3,84
      { 2: 1.04 },
      { 5: 0.52 },
      { 10: 0.26 },
      { 20: 0.13 },
      { 50: 0.05 },
      { 100: 0.01 },
      { 5000: 0.0001 },
    ],
    color: "#FFD700",
    subcolor: "#FF8C00",
    price: 1,
  },
  {
    id: 2,
    name: "Cash",
    description: "Un jeu à 5€ qui peut vous rapporter jusqu'à 500 000€.",
    winRate: [
      { 5: 26.32 }, // 1 chance sur 3,80
      { 10: 5.26 },
      { 20: 2.63 },
      { 50: 1.32 },
      { 100: 0.66 },
      { 500: 0.13 },
      { 1000: 0.026 },
      { 10000: 0.005 },
      { 500000: 0.000002 },
    ],
    color: "#008000",
    subcolor: "#006400",
    price: 5,
  },
  {
    id: 3,
    name: "X20",
    description:
      "Un ticket à 5€ avec des multiplicateurs allant jusqu'à 20 fois votre mise.",
    winRate: [
      { 5: 25.64 }, // 1 chance sur 3,90
      { 10: 5.13 },
      { 20: 2.56 },
      { 50: 1.28 },
      { 100: 0.64 },
      { 500: 0.13 },
      { 1000: 0.026 },
      { 10000: 0.005 },
      { 200000: 0.000002 },
    ],
    color: "#4169E1",
    subcolor: "#014587",
    price: 5,
  },
  {
    id: 4,
    name: "Millionnaire",
    description:
      "Un ticket à 10€ qui vous offre une chance de gagner 1 million d’euros.",
    winRate: [
      { 10: 30.3 }, // 1 chance sur 3,30
      { 20: 10.1 },
      { 50: 5.05 },
      { 100: 1.01 },
      { 500: 0.1 },
      { 1000: 0.02 },
      { 10000: 0.004 },
      { 100000: 0.0004 },
      { 1000000: 0.000003 },
    ],
    color: "#B22222",
    subcolor: "#8B0000",
    price: 10,
  },
  {
    id: 5,
    name: "Jackpot",
    description:
      "Un jeu à 3€ avec une chance sur 3,21 de gagner jusqu'à 30 000€.",
    winRate: [
      { 3: 31.15 }, // 1 chance sur 3,21
      { 6: 6.23 },
      { 9: 3.11 },
      { 12: 1.56 },
      { 15: 0.62 },
      { 30: 0.31 },
      { 30000: 0.0001 },
    ],
    color: "#228B22",
    subcolor: "#006400",
    price: 3,
  },
];
