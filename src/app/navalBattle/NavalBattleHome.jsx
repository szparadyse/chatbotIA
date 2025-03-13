import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { navalBattleRoomsServices } from "./../../services/navalBattleRoomsServices";

const mockRooms = [
  {
    id: 1,
    name: "Gaming Lounge",
    password: null,
    gamble: 100,
  },
  {
    id: 2,
    name: "Book Club",
    password: "test206",
    gamble: null,
  },
  {
    id: 3,
    name: "Tech Talk",
    password: null,
    gamble: 50,
  },
  {
    id: 4,
    name: "Music Studio",
    password: null,
    gamble: null,
  },
];

function NavalBattleHome() {
  const [addRoom, setAddRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    navalBattleRoomsServices.getNavalBattleRooms().then((res) => {
      setRooms(res);
    });
  }, []);
  console.log("rooms", rooms);

  const handleCreateRoom = () => {
    console.log("Créer une nouvelle salle");
    setAddRoom(true);
  };
  return (
    <>
      <div className="flex  w-full pt-2 ">
        <div className="flex flex-col gap-1 justify-center items-center mx-auto">
          <Card className="w-[700px] h-full max-h-[1000px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* add filter system */}
                <CardDescription className="font-bold">Rooms</CardDescription>
                <Button onClick={handleCreateRoom}>Nouvelle partie</Button>
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="overflow-auto min-h-[450px] max-h-[800px]">
              {addRoom && <CreateRoom />}
              {rooms.map((room) => {
                return (
                  <div key={room.id} className="flex flex-col gap-1">
                    <NavalBattleRoom
                      id={room._id}
                      name={room.name}
                      gamble={room.gamble}
                      password={room.password}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
function NavalBattleRoom({ id, name, gamble, password }) {
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!password) {
      console.log("Rejoindre la salle publique", name);
      navigate(`/navalBattle/room/${id}`);
    } else {
      if (passwordRequired) {
        console.log(
          "password: ",
          password,
          " | currentPassword: ",
          currentPassword
        );
        if (password == currentPassword) {
          console.log("Mot de passe correct, rejoindre la salle");
          navigate(`/navalBattle/room/${id}`);
        } else {
          console.log("Mot de passe incorrect");
        }
      } else {
        setPasswordRequired(true);
      }
    }
  };

  return (
    <div className="flex w-full pt-2">
      <div className="flex gap-3 flex-col items-center p-1 w-full">
        <Card className="w-full h-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{name}</span>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col overflow-auto min-h-[100] max-h-[200]">
            {<div className="pb-4">Mise = {gamble}</div>}
            <div className="pb-4">{password ? "Privée" : "Publique"}</div>

            {passwordRequired && (
              <div>
                <input
                  type="password"
                  placeholder="Entrez le mot de passe"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleJoin}>
              {passwordRequired ? "Vérifier le mot de passe" : "Rejoindre"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomGamble, setRoomGamble] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();
    console.log(
      "Créer une nouvelle salle avec les valeurs suivantes:",
      "Nom de la salle:",
      roomName,
      "Mot de passe:",
      roomPassword,
      "Mise:",
      roomGamble
    );

    navalBattleRoomsServices.addNavalBattleRoom({
      name: roomName,
      password: roomPassword,
      gamble: roomGamble,
    });
  };

  return (
    <div className="flex w-full pt-2">
      <div className="flex gap-3 flex-col items-center p-1 w-full">
        <Card className="w-full h-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Créer une nouvelle salle</span>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col overflow-auto min-h-[100] max-h-[200]">
            <form onSubmit={handleCreateRoom}>
              <div className="pb-4">
                <label>Nom de la salle:</label>
                <Input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              <div className="pb-4">
                <label>Mot de passe:</label>
                <Input
                  type="password"
                  value={roomPassword}
                  onChange={(e) => setRoomPassword(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <label>Mise:</label>
                <Input
                  type="number"
                  value={roomGamble}
                  onChange={(e) => setRoomGamble(e.target.value)}
                />
              </div>
              <Button type="submit">Créer</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  // const handleCreateRoom = () => {
  //   console.log("Créer une nouvelle salle");
  // };
  // return (
  //   <div className="flex w-full pt-2">
  //     <div className="flex gap-3 flex-col items-center p-1 w-full">
  //       <Card className="w-full h-auto">
  //         <CardHeader>
  //           <CardTitle className="flex items-center gap-2">
  //             <span>{name}</span>
  //           </CardTitle>
  //           <Separator />
  //         </CardHeader>
  //         <CardContent className="flex flex-col overflow-auto min-h-[100] max-h-[200]">
  //           <form onSubmit={handleCreateRoom}>
  //             <Button type="submit">Créer</Button>
  //           </form>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );
}

export default NavalBattleHome;
