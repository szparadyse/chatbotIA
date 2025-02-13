import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Bot, BotMessageSquare, FileText } from "lucide-react";
import { useRef } from "react";
import ChatList from "../../components/chatList";
import { ShimmerButton } from "../../components/magicui/shimmer-button";
import { Avatar, AvatarImage } from "../../components/ui/avatar";

import { DropdownMenuShortcut } from "../../components/ui/dropdown-menu";

function Chats() {
  const inputRef = useRef(null); // 🔹 Référence vers l'input

  // ✅ Fonction qui ajoute "@NexIA" dans l'input
  const useIA = () => {
    if (inputRef.current) {
      inputRef.current.value = " @NexIA " + inputRef.current.value  ;
      inputRef.current.focus(); // 🔹 Garde le focus sur l'input
    }
  };

  //Faire appel au point d'entré du back pour appeler l'ia avec les 10 dernier messages
  const resume = ()=>{

  };

  return (
    <div className="flex justify-center align-center pt-12">
      <Card className="w-[700px] h-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardDescription className="font-bold">Rooms</CardDescription>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="overflow-auto min-h-[450px] max-h-[450px]">
          <ChatList />
        </CardContent>
        <CardFooter className="flex justify-between gap-2 mt-4">

          {/* ✅ Menu déroulant avec ShimmerButton */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ShimmerButton>
                <Bot />
              </ShimmerButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>NexIA</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2" onClick={resume}>
                  <FileText />
                  <span>Résumer</span>
                  <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={useIA}>
                  <BotMessageSquare />
                  <span>Ask</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ✅ Ajout de ref sur l'input */}
          <Input ref={inputRef} placeholder="Message..." />
          <Button>Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chats;
