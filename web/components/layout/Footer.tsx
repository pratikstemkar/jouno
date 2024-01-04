const Footer = () => {
    return (
        <footer className="flex py-5 lg:px-20 w-full justify-center lg:justify-between items-center">
            <div className="font-mono text-muted-foreground">
                <span>Jouno&trade; &copy; 2023</span>
                <span> &#8226; </span>
                <span>
                    Developed by{" "}
                    <a
                        href="https://pratikstemkar.in"
                        className="underline dark:hover:text-white hover:text-muted-foreground"
                        target="_blank"
                    >
                        Pratik
                    </a>
                </span>
            </div>
            <div className="text-sm text-muted-foreground hidden lg:block">
                <a
                    href="#"
                    className="dark:hover:text-white hover:text-muted-foreground"
                >
                    <span>Privacy Policy</span>
                </a>
                <span> &#8226; </span>
                <a
                    href="#"
                    className="dark:hover:text-white hover:text-muted-foreground"
                >
                    <span>User Agreement</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
