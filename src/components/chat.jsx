import { useAuth } from "../contexts/authContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHighlightjs from "remark-highlight.js";
import "../app/dashboard/Chats.css";
function Chat({ sender, message }) {
  const { user } = useAuth();
  switch (sender.id) {
    case user.id:
      return (
        <div className="pt-3">
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground my-1">
            {message}
          </div>
        </div>
      );
    case "123":
      return (
        <div className="pt-3">
          <span className="flex  text-xs ml-1 text-muted-foreground">
            Envoyé par NexIA
          </span>
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted my-1">
            <Markdown remarkPlugins={[remarkGfm, remarkHighlightjs]}>
              {message}
            </Markdown>
          </div>
        </div>
      );
    default:
      return (
        <div className="pt-3">
          <span className="flex  text-xs ml-1 text-muted-foreground">
            Envoyé par {sender.username}
          </span>
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted my-1">
            {message}
          </div>
        </div>
      );
  }
}

export default Chat;
