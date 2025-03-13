import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { MessageCircle } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Scratch",
    description: "Soyez addict en toute securité",
    href: "/scratch",
    cta: "Start buralisting",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-3 bg-purple-200",
  },
  {
    Icon: FileTextIcon,
    name: "Slot machine",
    description: "Soyez addict en toute securité",
    href: "/slotMachine",
    cta: "Jouer",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:row-start-2 lg:row-end-5 lg:col-start-2 lg:col-end-3 bg-green-200",
  },
  {
    Icon: MessageCircle,
    name: "Chat bot with AI",
    description: "Pas besoin d'amis quand on a un NexAI",
    href: "/room/1",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4 bg-red-200",
  },
  {
    Icon: GlobeIcon,
    name: "Mon portefeuille",
    description: "",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: CalendarIcon,
    name: "Roulette",
    description: "Tourne la roue mon reuf",
    href: "/roulette",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-lime-200",
  },
  {
    Icon: BellIcon,
    name: "Bataille navale",
    description: "Vive le casinoooo",
    href: "/navalBattle",
    cta: "Viens ouvrir une petite boite",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 bg-sky-200",
  },
  {
    Icon: BellIcon,
    name: "CS:GO Nexa Simulateur",
    description: "Vive le casinoooo",
    href: "/loading",
    cta: "Viens ouvrir une petite boite",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-5 bg-orange-200",
  },
];

export function HomePage() {
  return (
    <div className="p-4">
      <BentoGrid className="lg:grid-rows-4">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
