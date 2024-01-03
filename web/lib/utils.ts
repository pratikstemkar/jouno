import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

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

export function convertTimestampToRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
}

export function convertTimestampToReadableTimeProfile(
    timestamp: string
): string {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
