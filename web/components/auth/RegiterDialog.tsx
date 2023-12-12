"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
// import { BotIcon, GithubIcon } from "lucide-react";
import { Input } from "../ui/input";

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
import { useRegisterMutation } from "@/lib/services/auth";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    username: z.string().min(4, {
        message: "Username must be atleast 4 characters.",
    }),
    email: z
        .string()
        .min(6, {
            message: "Email must be atleast 6 characters.",
        })
        .email(),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters.",
    }),
    confirmpassword: z.string().min(6, {
        message: "Password must be atleast 6 characters.",
    }),
});

const RegisterDialog = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
        },
    });

    const [error, setError] = useState("");
    const [register, { isLoading }] = useRegisterMutation();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        register({
            username: values.username,
            email: values.email,
            password: values.password,
        }).then((data: any) => {
            if (data.error) {
                console.log(data.error.data.data.Detail);
                setError(data.error.data.data.Detail);
            } else {
                console.log(data.data);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Register</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
                    </DialogTitle>
                    <DialogDescription>
                        Enter your credentials to register here.
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="flex w-full space-x-2">
                    <Button
                        className="w-1/2"
                        variant={"outline"}
                    >
                        <BotIcon className="h-4 w-4 mr-2" />
                        <span>Google</span>
                    </Button>
                    <Button
                        className="w-1/2"
                        variant={"outline"}
                    >
                        <GithubIcon className="h-4 w-4 mr-2" />
                        <span>GitHub</span>
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div> */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm">
                                        We do not share your information with
                                        anyone.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            <span>Register</span>
                        </Button>
                        <FormDescription className="text-red-500">
                            {error}
                        </FormDescription>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
