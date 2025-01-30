import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[var(--background)] border-t border-black mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/">
                            <h1 className="text-2xl font-semibold text-[var(--foreground)]">
                                Digital Rev Solutions
                            </h1>
                        </Link>
                        <Link href="https://github.com/phollenback" className="ml-4">
                            <h1 className="px-2 py-1 text-md text-[var(--foreground)] hover:bg-yellow-200 transition duration-200 ease-in-out rounded">
                                Github
                            </h1>
                        </Link>
                        <Link href="http://digitalrev.com" className="ml-4">
                            <h1 className="px-2 py-1 text-md text-[var(--foreground)] hover:bg-yellow-200 transition duration-200 ease-in-out rounded">
                                My Site
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-[var(--foreground)]">
                            &copy; {new Date().getFullYear()} Digitize. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;