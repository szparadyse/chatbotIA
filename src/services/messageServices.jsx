


export const messageServices = {
  sendMessage : async (message,room)=>{
    const response = await fetch(`${import.meta.env.VITE_DB_URI}/api/messages/${room}`,{
        method:"POST",
        headers :  {"Content-type": "application/json"},
        body: JSON.stringify(message),
    })
    if (response) console.log(response)
  }
}