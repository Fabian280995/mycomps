import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AuthLinks from "./auth-links";

const MainHeader = () => {
  return (
    <header
      className="flex items-center justify-between padding-x py-4 gap-12
      w-full bg-white"
    >
      <div className="flex justify-between items-center sm:items-end transition-all duration-500 ease-in-out">
        <Link href="/">
          <h1
            className="transition-all duration-500 ease-in-out font-semibold
            select-none cursor-pointer text-4xl drop-shadow-md text-gray-900"
          >
            my
            <span className="font-bold text-teal-400">comps</span>
            <span className="text-gray-400 text-sm ml-1">.de</span>
          </h1>
          <p className="hidden sm:block text-gray-400 text-xs">
            Level Up Your Competition
          </p>
        </Link>
      </div>
      {/* 
      <MainHeaderNav /> */}
      <AuthLinks />
    </header>
  );
};

export default MainHeader;
