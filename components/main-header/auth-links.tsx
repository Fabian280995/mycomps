"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const AuthLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <Link
          href="/dashboard"
          className="hover:underline transition-all duration-150
      text-gray-700 text-base "
          legacyBehavior
        >
          Zum Dashboard
        </Link>
        <UserButton afterSignOutUrl="/home" />
      </SignedIn>
      <SignedOut>
        <Link
          href="/for-organizers"
          className="hover:underline transition-all duration-150
    text-gray-400 font-semibold text-lg "
        >
          Ich bin Veranstalter
        </Link>
        <SignInButton>
          <button
            className="bg-teal-400 hover:bg-teal-500 transition-all duration-150
    text-white font-semibold text-lg px-4 py-2 rounded-md"
          >
            Anmelden
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default AuthLinks;
