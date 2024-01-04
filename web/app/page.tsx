"use client";

import CreatePostCard from "@/components/home/CreatePostCard";
import PostList from "@/components/home/PostList";
import TopDestinationsCard from "@/components/home/TopDestinationsCard";
import TopTravellersCard from "@/components/home/TopTravellersCard";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Home() {
    const auth = useAuth();

    return (
        <main className="max-w-7xl m-auto py-5">
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-4 px-2 lg:px-0">
                <div className="lg:w-3/4 space-y-4">
                    {auth.user && <CreatePostCard />}
                    <div className="flex flex-col space-y-4">
                        <PostList />
                    </div>
                </div>
                <div className="lg:w-1/4 flex flex-col space-y-4">
                    <TopDestinationsCard />
                    {/* <TopTravellersCard /> */}
                </div>
            </div>
        </main>
    );
}
