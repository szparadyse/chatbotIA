import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function MiseSelector({tableauDesMises, setMise, mise}) {

 
  const [indexMise, setIndexMise] = useState(0);

  const handleMise = (value) => {
    if(indexMise + value >= 0 && indexMise + value <= tableauDesMises.length - 1){
      setMise(tableauDesMises[indexMise + value]);
      setIndexMise(indexMise + value);
    }
  };

  return (
    (<div
      className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button
        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Upvote"
        onClick={() => handleMise(1)}>
        <PlusIcon size={16} aria-hidden="true" />
      </Button>
      <span
        className="border-input flex items-center border px-3 text-sm font-medium bg-white">{mise}</span>
      <Button
        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Downvote"
        onClick={() => handleMise(-1)}>
        <Minus size={16} aria-hidden="true" />
      </Button>
    </div>)
  );
}
