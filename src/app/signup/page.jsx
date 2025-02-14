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
                src="https://cdn-icons-png.flaticon.com/512/120/120082.png"
                className="mr-2 size-6 rounded-full"
              />
              Babylone inc.
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
          src="https://cdn.discordapp.com/attachments/1308859125832224840/1330822789720182835/IMG_3626.webp?ex=67b0564e&is=67af04ce&hm=6a7ac44970cbfcb24e1681c9a86e0b906701eb1b1d1018aed68c474c3f9a6c27&"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
