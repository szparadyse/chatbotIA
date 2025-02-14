import { useAuth } from "../contexts/authContext";

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
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-sky-400 my-1">
            {message}
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
