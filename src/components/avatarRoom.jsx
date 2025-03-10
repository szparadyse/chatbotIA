
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";



export default function Room({id, name, avatar , handleClick}) {

  return (


    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link d={`avatar-container-${id}`} className="flex h-[50px] w-[50px] rounded-[25px] bg-gray-200 hover:rounded-[18px] transition-all duration-300 cursor-pointer  bg-cover bg-center" style={{ backgroundImage: `url(${avatar})` }} onClick={handleClick} to={`/room/${id}`}></Link>
        </TooltipTrigger>
        <TooltipContent side="right">
        <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    
    
  )
}


