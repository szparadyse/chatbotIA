import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export function SignUpForm({ className, ...props }) {
  const { register } = useAuth();
  const sub = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    if (payload.username.trim() !== "" && payload.password.trim() !== "") {
      console.log(payload);
      register(payload);
    }
  };
  return (
    <form
      onSubmit={sub}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Littler</h1>
        <p className="text-balance text-sm text-muted-foreground">
          première règle du Littler club: Tu ne parles pas du Littler club
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">pseudo</Label>
          <Input id="username" type="text" name="username" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">numéro de sécu</Label>
          </div>
          <Input id="password" type="password" name="password" required />
        </div>
        <Button type="submit" className="w-full">
          Rejoindre le parti
        </Button>
      </div>
      <div className="text-center text-sm">
        {" "}
        <Link className="underline" to="/login">
          Si t'as déjà un compte pourquoi tu es là?
        </Link>
      </div>
    </form>
  );
}
