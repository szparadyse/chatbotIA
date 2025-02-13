function Chat({ type, sender, message }) {
  switch (type) {
    case "send":
      return (
        <div className="pt-3">
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground my-1">
            {message}
          </div>
        </div>
      );

    case "received":
      return (
        <div className="pt-3">
          <span className="flex  text-xs ml-1 text-muted-foreground">Envoyé par {sender}</span>
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted my-1">
            {message}
          </div> 
        </div>

      );

    case "ia":
      return (
        <div className="pt-3">
          <span className="flex  text-xs ml-1 text-muted-foreground">Envoyé par NexIA</span>
          <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted my-1">
            {message}
          </div>
        </div>
      );

    default:
      return null; // Évite les erreurs si `type` n'est pas reconnu
  }
}

export default Chat;
