import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { ToastContainer, toast } from "react-toastify";

export function LoginForm({ className, ...props }) {
  const { login, user } = useAuth();
  const connect = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    if (payload.username.trim() !== "" && payload.password.trim() !== "") {
      login(payload);
    } else {
      console.log("chaine vide");
      toast("chaine vide");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl"> NexAI</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={connect}>
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Pseudo</Label>
                  <Input id="username" type="text" name="username" required />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Code de CB </Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Comment ça mon reuf?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Let's goooo
                </Button>
              </div>
              <div className="text-center text-sm">
                Pas de compte? Force à toi{" "}
                <Link className="underline" to="/signup">
                  {"(je dehek)"}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#<">Privacy Policy</a>.
      </div>
    </div>
  );
}
