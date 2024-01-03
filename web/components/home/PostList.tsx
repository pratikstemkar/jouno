"use client";

import { useGetAllPostsQuery } from "@/lib/services/post";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
    const { data, error, isLoading } = useGetAllPostsQuery("");

    return (
        <>
            {data &&
                data?.data?.map((post: any) => (
                    <PostCard
                        {...post}
                        key={post?.id}
                    />
                ))}
            {isLoading && <PostSkeleton />}
            {error && (
                <>
                    Encountered an error while fetching the posts. Reload to try
                    again!
                </>
            )}
        </>
    );
};

export default PostList;
