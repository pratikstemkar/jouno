"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Profile, useUpdateProfileMutation } from "@/lib/services/profile";
import { useAppDispatch } from "@/lib/hooks/hooks";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be atleast 4 characters.",
    }),
    pronouns: z.string(),
    gender: z.string(),
    avatar: z.string(),
    banner: z.string(),
    bio: z.string(),
    website: z.string(),
    location: z.string(),
});

const EditProfile = (props: Profile) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.name,
            pronouns: props.pronouns,
            gender: props.gender,
            avatar: props.avatar,
            banner: props.banner,
            bio: props.bio,
            website: props.website,
            location: props.location,
        },
    });

    const [error, setError] = useState("");
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        updateProfile({
            id: props.id,
            ...values,
        }).then((data: any) => {
            if (data.error) {
                console.log(data.error);
                setError(data.error.data.message);
            } else {
                console.log(data.data);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="-mt-10 lg:mt-0"
                >
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pronouns"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pronouns</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="banner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Banner Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
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
                                <span>Save Changes</span>
                            </Button>
                        </div>
                        <FormDescription className="text-red-500">
                            {error}
                        </FormDescription>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
