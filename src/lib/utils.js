import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function encodeBase64Value(value) {
    if (!value) return "";
    try {
        return btoa(value);
    } catch (e) {
        console.error("Error encoding base64 value:", e);
        return value;
    }
}
