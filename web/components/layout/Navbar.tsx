"use client";

// import { ToggleTheme } from "../ToggleTheme";
import Image from "next/image";
import LoginDialog from "../auth/LoginDialog";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/authSlice";
import { useAuth } from "@/lib/hooks/useAuth";
// import { Button } from "../ui/button";

const Navbar = () => {
    const auth = useAuth();

    return (
        <>
            <nav className="flex justify-between w-full px-20 py-2">
                <div className="text-4xl tracking-tighter font-extrabold hover:text-primary hover:cursor-pointer">
                    <a href="/">
                        <div className="flex justify-center items-center">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={35}
                                height={75}
                            />
                            <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                        </div>
                    </a>
                </div>
                <div className="flex space-x-5">
                    {JSON.stringify(auth.user)}
                    <LoginDialog />
                    {/* <Button variant="ghost">Register</Button> */}
                    {/* <ToggleTheme /> */}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
