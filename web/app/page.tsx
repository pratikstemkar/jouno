import CreatePostCard from "@/components/home/CreatePostCard";
import PostCard from "@/components/home/PostCard";
import PostList from "@/components/home/PostList";
import TopDestinationsCard from "@/components/home/TopDestinationsCard";
import TopTravellersCard from "@/components/home/TopTravellersCard";

export default function Home() {
    return (
        <main className="max-w-7xl m-auto py-5">
            <div className="flex space-x-4">
                <div className="w-3/4">
                    <CreatePostCard />
                    <div className="mt-4 flex flex-col space-y-4">
                        <PostList />
                    </div>
                </div>
                <div className="w-1/4 flex flex-col space-y-4">
                    <TopDestinationsCard />
                    <TopTravellersCard />
                </div>
            </div>
        </main>
    );
}
