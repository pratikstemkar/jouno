"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2Icon, PlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@/lib/hooks/useAuth";
import { useCreatePostMutation } from "@/lib/services/post";

const formSchema = z.object({
    title: z
        .string()
        .min(6, {
            message: "Title must be atleast 6 characters.",
        })
        .max(16, {
            message: "Title must be atmax 16 characters.",
        }),
    body: z.string().min(10, {
        message: "Body must be atleadst 10 characters.",
    }),
});

const CreatePostCard = () => {
    const auth = useAuth();
    const [createPost, { data, error, isLoading }] = useCreatePostMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        createPost(values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex justify-between items-center border border-slate-750 px-2 py-2 rounded-full hover:cursor-pointer group">
                    <div className="flex space-x-2 items-center">
                        <Avatar>
                            <AvatarImage
                                src={auth?.user?.avatar}
                                className="h-10 w-10"
                            />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        <div className="text-muted-foreground">
                            Share a Trip
                        </div>
                    </div>
                    <Button className="rounded-full bg-primary h-10 w-10">
                        <span>
                            <PlusIcon className="h-6 w-6 group-hover:rotate-90 transition duration-300 ease-in-out" />
                        </span>
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader className="">
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>
                        Create a Post about your latest trip or share some tips
                        for someone planning to visit.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Title</FormLabel> */}
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter Title of the Post"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Body</FormLabel> */}
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share about your trip, tips, experiences, places, etc."
                                            rows={10}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="mt-4"
                            >
                                {isLoading ? (
                                    <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
                                ) : null}
                                <span>Post</span>
                            </Button>
                        </div>
                        <FormDescription>
                            {data && (
                                <span className="text-green-500">
                                    {JSON.stringify(data?.message)}
                                </span>
                            )}
                            {JSON.stringify(error)}
                        </FormDescription>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostCard;
