import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/120/120082.png"
            className="mr-2 size-6 rounded-full"
          />
          Babylone inc.
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
