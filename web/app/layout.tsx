import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DevAlert from "@/components/layout/DevAlert";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: "Travel to know your surroundings.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} flex flex-col justify-between min-h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StoreProvider>
                        {process.env.NEXT_PUBLIC_ENV === "dev" && <DevAlert />}
                        <div>
                            <Navbar />
                            {children}
                        </div>
                        <Footer />
                    </StoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
