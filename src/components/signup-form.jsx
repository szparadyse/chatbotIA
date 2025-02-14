import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export function SignUpForm({ className, ...props }) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const sub = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    if (payload.username.trim() !== "" && payload.password.trim() !== "") {
      console.log(payload);
      register(payload).then((res) => (res === true ? navigate("/login") : ""));
    }
  };
  return (
    <form
      onSubmit={sub}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">NexAI</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Rejoins le premier chat sans censure avec une IA intégrée.
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
          rejoins la team DTR
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
