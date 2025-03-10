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
import { Blocks, Bot, BotMessageSquare, FileText } from "lucide-react";
import { use, useRef, useState } from "react";
import ChatList from "../../components/chatList";
import { ShimmerButton } from "../../components/magicui/shimmer-button";
import { Avatar, AvatarImage } from "../../components/ui/avatar";

import { useParams } from "react-router-dom";
import { DropdownMenuShortcut } from "../../components/ui/dropdown-menu";
import { useAuth } from "../../contexts/authContext";
import { messageServices } from "../../services/messageServices";
import EmojiPicker from "emoji-picker-react";
import "./Chats.css";

function Chats() {
  const inputRef = useRef(""); // 🔹 Référence vers l'input
  const { id } = useParams();
  const { user } = useAuth();

  const [roomId, setRoomId] = useState("");
  const [isThinking, setisThinking] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  // ✅ Fonction qui ajoute "@NexIA" dans l'input
  const useIA = () => {
    if (inputRef.current) {
      inputRef.current.value = "@NexIA " + inputRef.current.value;
      inputRef.current.focus(); // 🔹 Garde le focus sur l'input
    }
  };

  const AddEmote = (e) => {
    console.log(e);
    inputRef.current.value += e.emoji;
  };

  //Faire appel au point d'entré du back pour appeler l'ia avec les 10 dernier messages
  const resume = () => {};

  const sendMessage = async () => {
    try {
      if (inputRef.current.value.trim() !== "") {
        const payload = {
          sender: {
            id: user.id,
            username: user.username,
          },
          content: inputRef.current.value,
        };

        // Vérifier si le message contient "@NextIA"
        await messageServices.sendMessage(payload, id);
        inputRef.current.value = "";
        if (payload.content.includes("@NexIA")) {
          // Supprimer "@NextIA" de la chaîne
          const messageSansNextIA = payload.content
            .replace("@NexIA", "")
            .trim();
          setisThinking(true);
          await messageServices.sendRequestToIA(messageSansNextIA, id);
          setisThinking(false);
        }
        setIsPickerVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full pt-2 ">
      <div className="flex gap-2 w-[700px] mb-2 self-center">
        <Input
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          placeholder="Navigate to a specific room...."
        />
        <Button asChild>
          <a href={`/room/${roomId}`}>Go</a>
        </Button>
      </div>
      <Card className="w-[700px] h-auto mx-auto">
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
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={resume}
                >
                  <FileText />
                  <span>Résumer</span>
                  <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={useIA}
                >
                  <BotMessageSquare />
                  <span>Ask</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ✅ Ajout de ref sur l'input */}
          <form action={sendMessage} className="flex w-full gap-2">
            {/* <Textarea ref={inputRef} placeholder="Message..." /> */}
            <Input ref={inputRef} placeholder="Message..." />
            <Button type="submit">Send</Button>
            <div>
              <Button onClick={() => setIsPickerVisible(!isPickerVisible)}>
                :)
              </Button>
              <div className="visible">
                <EmojiPicker
                  onEmojiClick={(e) => AddEmote(e)}
                  open={isPickerVisible ? true : false}
                />
              </div>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chats;
