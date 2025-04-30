import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function to merge class names for Tailwind CSS
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}