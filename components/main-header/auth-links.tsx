"use client";
import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLinks = () => {
  const pathanme = usePathname();
  return (
    <div className="flex items-center gap-4">
      <Link
        href={pathanme === "/comps-map" ? "/" : "/comps-map"}
        className="hover:underline transition-all duration-150 text-gray-400 font-semibold text-base"
      >
        {pathanme === "/comps-map" ? "Zurück zur Startseite" : "Zur Karte"}
      </Link>
      <SignedIn>
        <Link
          href="/dashboard"
          className="hover:underline transition-all duration-150 text-gray-400 font-semibold text-base"
        >
          Zum Dashboard
        </Link>
        <div className="ring-2 ring-teal-400 rounded-full ring-offset-2 w-8 h-8 flex justify-center items-center">
          <ClerkLoading>
            <User2 size={24} className="text-gray-400/20" />
          </ClerkLoading>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <Link
          href="/for-organizers"
          className="hover:underline transition-all duration-150
        text-gray-400 font-semibold text-base"
        >
          Ich veranstalte Wettkämpfe
        </Link>
        <SignInButton>
          <button
            className="bg-teal-400 hover:bg-teal-500 transition-all duration-150
          text-white font-semibold text-lg uppercase px-4 py-2 rounded-md"
          >
            Anmelden
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default AuthLinks;
