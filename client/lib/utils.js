import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// next/image only optimizes /public files and hosts allowed in next.config.mjs
// (any other host would throw), so image paths stored in the database are
// checked before being handed to the optimizer.
export function canOptimizeImage(src) {
  if (!src) return false;
  if (src.startsWith("/")) return true;
  try {
    return new URL(src).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
