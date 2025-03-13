import { clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const toasty = {
  success: (message) => {
    toast.success(message, {
      className: "bg-green-500",
    });
  },
  error: (message) => {
    toast.error(message, {
      className: "bg-sky-200",
    });
  },
};
