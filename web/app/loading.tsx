import { Loader2 } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <main className="flex w-full justify-center items-center mt-10 lg:mt-20">
            <Loader2 className="animate-spin h-10 w-10" />
        </main>
    );
}
