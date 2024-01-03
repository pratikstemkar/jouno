import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Suspense } from "react";

const ProfileHoverCard = () => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="flex space-x-1 hover:cursor-pointer">
                    <Avatar className="h-6 w-6">
                        <AvatarImage
                            src="https://github.com/pratikstemkar.png"
                            alt="@pratikstemkar"
                        />
                        <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <span>pratikstemkar</span>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/pratikstemkar.png" />
                        <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            @pratikstemkar
                        </h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by
                            @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined December 2021
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default ProfileHoverCard;
