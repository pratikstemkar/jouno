import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTimestampToMonthAndYear(timestampString: string) {
    const date = new Date(timestampString);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
    });
}
