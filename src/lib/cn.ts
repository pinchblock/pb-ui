import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Class merger used by every component. Later classes win conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
