import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { BotIcon, GithubIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LoginDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Login</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome to Jouno</DialogTitle>
                    <DialogDescription>
                        Enter your login credentials or register here.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex w-full space-x-2">
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
                </div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                />
                <DialogFooter>
                    <Button>Login</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
