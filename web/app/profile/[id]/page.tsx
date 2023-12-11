"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { useGetProfileQuery } from "@/lib/services/profile";
import { CalendarDaysIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

const Page = ({ params }: { params: { id: string } }) => {
    const profileId = params.id;
    const auth = useAuth();
    const { data, error, isLoading } = useGetProfileQuery(profileId);

    return (
        <div className="max-w-5xl m-auto">
            <Image
                src="https://pbs.twimg.com/profile_banners/1024535410117169152/1677389332/1500x500"
                alt="profile banner image"
                height={100}
                width={1200}
                className="rounded-3xl"
            />
            <div className="px-10">
                <div className="flex justify-between items-center">
                    <Avatar className="h-40 w-40 -mt-20 hover:cursor-pointer">
                        <AvatarImage src={data?.data?.avatar} />
                        <AvatarFallback>{data?.data?.username}</AvatarFallback>
                    </Avatar>
                    {auth?.user?.id === profileId ? (
                        <Button variant={"outline"}>Edit Profile</Button>
                    ) : null}
                </div>
                <div className="mt-2">
                    <h2 className="font-extrabold text-xl">
                        {data?.data?.name}
                    </h2>
                    <span className="text-sm text-slate-500">
                        @{data?.data?.username}
                    </span>
                    <p>{data?.data?.bio}</p>
                    <div className="flex space-x-4 mt-2 items-center text-sm">
                        {data?.data?.location && (
                            <div className="flex space-x-1 items-center">
                                <MapPinIcon className="h-4 w-4 text-slate-500" />
                                <span>{data?.data?.location}</span>
                            </div>
                        )}
                        {data?.data?.website && (
                            <div className="flex space-x-1 items-center">
                                <LinkIcon className="h-4 w-4 text-slate-500" />
                                <a
                                    href={`https://pratikstemkar.in`}
                                    target="_blank"
                                    className="text-blue-500 underline hover:cursor-pointer"
                                >
                                    {data?.data?.website}
                                </a>
                            </div>
                        )}
                        {data?.data?.CreatedAt && (
                            <div className="flex space-x-1 items-center">
                                <CalendarDaysIcon className="h-4 w-4 text-slate-500" />
                                <span className="">
                                    Joined {data?.data?.CreatedAt}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;