import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { HeartIcon, MessageSquareIcon, Share2Icon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardDescription className="flex space-x-2 items-center">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                    </CardDescription>
                    <CardTitle>
                        <div className="flex items-center">
                            <Skeleton className="h-8 w-3/4 rounded-full" />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </CardContent>
                <CardFooter>
                    {/* <div className="flex items-center"> */}
                    <Skeleton className="h-8 w-1/4 rounded-full" />
                    {/* </div> */}
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardDescription className="flex space-x-2 items-center">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                    </CardDescription>
                    <CardTitle>
                        <div className="flex items-center">
                            <Skeleton className="h-8 w-3/4 rounded-full" />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </CardContent>
                <CardFooter>
                    {/* <div className="flex items-center"> */}
                    <Skeleton className="h-8 w-1/4 rounded-full" />
                    {/* </div> */}
                </CardFooter>
            </Card>
        </>
    );
};

export default PostSkeleton;
