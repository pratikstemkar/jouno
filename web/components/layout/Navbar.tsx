"use client";

// import { ToggleTheme } from "../ToggleTheme";
import Image from "next/image";
import LoginDialog from "../auth/LoginDialog";
import { useAuth } from "@/lib/hooks/useAuth";
import { UserNav } from "./Usernav";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { logout, setCredentials } from "@/lib/features/authSlice";
import { useEffect } from "react";
import RegisterDialog from "../auth/RegiterDialog";
// import { Button } from "../ui/button";

const Navbar = () => {
    const auth = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            console.log("token found in localstorage");
            dispatch(
                setCredentials({
                    user: JSON.parse(localStorage.getItem("user")!),
                    token: localStorage.getItem("token"),
                })
            );
        } else {
            console.log("token not found");
            dispatch(logout());
        }
    }, []);

    return (
        <>
            <nav className="flex justify-between w-full px-20 py-2 items-center">
                <div className="text-3xl tracking-tighter font-extrabold transition ease-in-out duration-200 hover:text-primary hover:cursor-pointer">
                    <a href="/">
                        <div className="flex justify-center items-center">
                            {/* <Image
                                src="/logo.png"
                                alt="Logo"
                                width={35}
                                height={75}
                            /> */}
                            <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                        </div>
                    </a>
                </div>
                <div className="flex space-x-5">
                    {/* {JSON.stringify(auth.user)} */}
                    {/* {JSON.stringify(token)} */}
                    {auth.user ? (
                        <UserNav {...auth.user} />
                    ) : (
                        <>
                            <LoginDialog />
                            <RegisterDialog />
                        </>
                    )}
                    {/* <Button variant="ghost">Register</Button> */}
                    {/* <ToggleTheme /> */}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
