import Link from "next/link";
import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs";

const Navigation: React.FC = () => {
    return (
        <nav className="bg-[var(--background)] border-b border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center mt-6">
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/">
                            <h1 className="text-3xl font-semibold text-[var(--foreground)]">
                                Resume Rep
                            </h1>
                        </Link>
                        <Link href="/dashboard/create" className="ml-4 mt-2">
                            <h1 className="px-2 py-1 text-mg text-[var(--foreground)] hover:bg-yellow-200 transition duration-200 ease-in-out rounded">
                                Create
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton>
                                <button className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/user-profile" className="hover:bg-yellow-200 transition duration-200 ease-in-out rounded px-2 py-1">
                                Profile
                            </Link>
                            <SignOutButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;