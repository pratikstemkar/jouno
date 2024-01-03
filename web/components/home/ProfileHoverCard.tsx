import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatTimestampToMonthAndYear } from "@/lib/utils";

export interface ProfileData {
    id: string;
    username: string;
    name: string;
    bio: string;
    email: string;
    pronouns: string;
    avatar: string;
    website: string;
    gender: string;
    location: string;
    CreatedAt: string;
}

const ProfileHoverCard = (props: ProfileData) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="flex space-x-2 hover:cursor-pointer items-center">
                    <Avatar className="h-6 w-6">
                        <AvatarImage
                            src={props?.avatar}
                            alt={`@${props?.username}`}
                        />
                        <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <span>{props?.username}</span>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                    <Avatar>
                        <AvatarImage src={props?.avatar} />
                        <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            {`@${props?.username}`}
                        </h4>
                        <p className="text-sm">{props?.bio}</p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                {`Joined ${formatTimestampToMonthAndYear(
                                    props?.CreatedAt
                                )}`}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default ProfileHoverCard;
