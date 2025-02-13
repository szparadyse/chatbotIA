import { GalleryVerticalEnd } from "lucide-react";

import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex">
              <img
                src="https://t3.ftcdn.net/jpg/05/78/88/58/240_F_578885811_pL5e4fXxC473DjNi4t2AuNnldS6iJCgW.jpg"
                className="mr-2 size-6 rounded-full"
              />
              Little inc.
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://www.politis.fr/wp-content/uploads/2025/01/ELON_MUSK_NZ-808x538.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
