import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileHoverCard from "./ProfileHoverCard";
import { HeartIcon, MessageSquareIcon, Share2Icon } from "lucide-react";
import {
    convertTimestampToReadableTimeProfile,
    convertTimestampToRelativeTime,
} from "@/lib/utils";

export interface PostData {
    id: string;
    title: string;
    body: string;
    image: string;
    userID: string;
    User: any;
    CreatedAt: string;
}

const PostCard = (props: PostData) => {
    return (
        <Card>
            <CardHeader>
                <CardDescription className="flex space-x-2 items-center">
                    <ProfileHoverCard {...props?.User} />
                    <span>&#8226;</span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                {convertTimestampToRelativeTime(
                                    props?.CreatedAt
                                )}
                            </TooltipTrigger>
                            <TooltipContent>
                                {convertTimestampToReadableTimeProfile(
                                    props?.CreatedAt
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardDescription>
                <CardTitle>{props?.title}</CardTitle>
            </CardHeader>
            <CardContent>{props?.body}</CardContent>
            <CardFooter>
                <HeartIcon className="h-5 w-5 mx-2 text-primary transition ease-in-out delay-100 duration-300 hover:scale-125 hover:cursor-pointer active:text-indigo-500" />
                <Button variant={"ghost"}>
                    <MessageSquareIcon className="h-5 w-5" />
                </Button>
                <Button variant={"ghost"}>
                    <Share2Icon className="h-5 w-5" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PostCard;
