import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { useState } from "react";

export function Ticket() {
  const [result, setResult] = useState(null);

  return (
    <ScratchToReveal
      width={350}
      height={350}
      minScratchPercentage={50}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
    >
      <p className="text-9xl">😎</p>
    </ScratchToReveal>
  );
}
