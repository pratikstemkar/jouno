const Footer = () => {
    return (
        <footer className="flex py-5 px-20 w-full justify-between items-center">
            <div className="font-mono text-slate-500">
                <span>Jouno&trade; &copy; 2023</span>
                <span> &#8226; </span>
                <span>
                    Developed by{" "}
                    <a
                        href="https://pratikstemkar.in"
                        className="underline dark:hover:text-white hover:text-slate-950"
                        target="_blank"
                    >
                        Pratik
                    </a>
                </span>
            </div>
            <div className="text-sm text-slate-500">
                <a
                    href="#"
                    className="dark:hover:text-white hover:text-slate-950"
                >
                    <span>Privacy Policy</span>
                </a>
                <span> &#8226; </span>
                <a
                    href="#"
                    className="dark:hover:text-white hover:text-slate-950"
                >
                    <span>User Agreement</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
