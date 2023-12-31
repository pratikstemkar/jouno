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
import { useLoginMutation } from "@/lib/services/auth";
import { setCredentials } from "@/lib/features/authSlice";
import { Loader2Icon } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useState } from "react";

const formSchema = z.object({
    identity: z.string().min(4, {
        message: "Username/Email must be atleast 4 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be atleast 6 characters.",
    }),
});

const LoginDialog = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identity: "",
            password: "",
        },
    });

    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        login(values).then((data: any) => {
            if (data.error) {
                console.log(data.error);
                setError(data.error.data.message);
            } else {
                console.log(data.data);
                dispatch(
                    setCredentials({
                        user: data.data.user,
                        token: data.data.data,
                    })
                );
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Login</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Welcome back to {process.env.NEXT_PUBLIC_APP_NAME}
                    </DialogTitle>
                    <DialogDescription>
                        Enter your login credentials here.
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
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="identity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your username/email"
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
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            <span>Login</span>
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

export default LoginDialog;
