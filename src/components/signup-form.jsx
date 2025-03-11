import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function validatePassword(password) {
  // Longueur minimale et maximale du mot de passe
  if (password.length < 8 || password.length > 50) {
    return false;
  }
  // verifier si le mot de passe contient au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
}

// Vérification du champ de confirmation du mot de passe
function validateConfirmPassword(password, confirmPassword) {
  const bool = false;
  if (password == confirmPassword) {
    bool = true;
  }
  return bool;
}

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
      if (validatePassword(payload.password)) {
        if (
          validateConfirmPassword(
            formData.get("password"),
            formData.get("confirmPassword")
          )
        ) {
          register(payload).then((res) =>
            res === true ? navigate("/login") : ""
          );
        } else {
          toast("les mots de passes ne sont pas identiques");
          console.log("les mots de passes ne sont pas identiques");
        }
      } else {
        console.log(
          "Le mot de passe doit contenir Miniscules / Majuscules / chiffres / caractères spéciaux"
        );
        toast(
          "Le mot de passe doit contenir Miniscules / Majuscules / chiffres / caractères spéciaux"
        );
      }
    } else {
      toast("chaine vide");
      console.log("chaine vide");
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">confirme ton numéro de sécu</Label>
          </div>
          <Input
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          rejoins la team DTR
        </Button>
        <ToastContainer />
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
