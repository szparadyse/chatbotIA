import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex">
          <img
            src="https://t3.ftcdn.net/jpg/05/78/88/58/240_F_578885811_pL5e4fXxC473DjNi4t2AuNnldS6iJCgW.jpg"
            className="mr-2 size-6 rounded-full"
          />
          Little inc.
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
