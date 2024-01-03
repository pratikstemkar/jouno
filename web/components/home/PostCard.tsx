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
import { Suspense } from "react";

const PostCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardDescription className="flex space-x-2">
                    <ProfileHoverCard />
                    <span> &#8226; </span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <span>10 mins ago</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Exact time with timezone. Maybe time of your
                                    timezone.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardDescription>
                <CardTitle>hahah</CardTitle>
            </CardHeader>
            <CardContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                eaque saepe culpa voluptas iste laudantium quod deleniti vitae
                amet. Autem, repudiandae? Ab eius ut sint sit commodi sapiente
                nihil eveniet? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Sint accusamus, rerum provident autem enim sed
                quasi deserunt corporis exercitationem placeat. Incidunt quos
                minus nobis aliquid optio dolores nesciunt laborum voluptates!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
                recusandae nesciunt distinctio cum, sunt dolorum ea esse at
                laboriosam eos vero repellendus! Facilis magnam eveniet ipsum
                dolorum similique sit obcaecati.
            </CardContent>
            <CardFooter>
                <Button variant={"ghost"}>
                    <HeartIcon className="h-5 w-5 text-primary" />
                </Button>
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
