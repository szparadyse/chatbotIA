import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import ChatList from "../../components/chatList"
import { Bot } from "lucide-react"
import { ShimmerButton } from "../../components/magicui/shimmer-button"
import { Separator } from "@/components/ui/separator"




function Chats() {
  return (
    <div className="flex justify-center align-center pt-12">
     <Card className="w-[700px] h-auto  " >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardDescription className="font-bold">Rooms</CardDescription>
        </CardTitle>
      <Separator/>
      </CardHeader>
      <CardContent className="overflow-auto min-h-[450px] max-h-[450px]">
        <ChatList/>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 mt-4">
        <ShimmerButton>
          <Bot></Bot>
        </ShimmerButton>
        <Input placeholder="Message..." ></Input>
        <Button>Send</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Chats