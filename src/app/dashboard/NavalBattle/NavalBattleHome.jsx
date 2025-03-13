import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const mockRooms = [
  {
    id: 1,
    name: "Gaming Lounge",
    password: null,
    gambling: true,
    gamble: 100,
  },
  {
    id: 2,
    name: "Book Club",
    password: "test206",
    gambling: false,
    gamble: 0,
  },
  {
    id: 3,
    name: "Tech Talk",
    password: null,
    gambling: true,
    gamble: 50,
  },
  {
    id: 4,
    name: "Music Studio",
    password: null,
    gambling: false,
    gamble: 0,
  },
];

function NavalBattleHome() {
  return (
    <>
      <div className="flex  w-full pt-2 ">
        <div className="flex flex-col gap-1 justify-center items-center mx-auto">
          <Card className="w-[700px] h-full max-h-[1000px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* add filter system */}
                <CardDescription className="font-bold">Rooms</CardDescription>
              </CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="overflow-auto min-h-[450px] max-h-[800px]">
              {mockRooms.map((room) => {
                return (
                  <div key={room.id} className="flex flex-col gap-1">
                    <NavalBattleRoom
                      id={room.id}
                      name={room.name}
                      gamble={room.gamble}
                      gambling={room.gambling}
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
function NavalBattleRoom({ id, name, gamble, gambling, password }) {
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
            {gambling && <div className="pb-4">Mise = {gamble}</div>}
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
              {status === "private" && passwordRequired
                ? "Vérifier le mot de passe"
                : "Rejoindre"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NavalBattleHome;
