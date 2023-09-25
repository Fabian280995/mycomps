import React from "react";
import Link from "next/link";
import StaticHeaderNav from "./nav";

const StaticHeader = () => {
  return (
    <header
      className="flex items-center justify-between padding-x py-4 gap-12
      w-full bg-white"
    >
      <div className="flex justify-between items-center sm:items-end transition-all duration-500 ease-in-out">
        <Link href="/home">
          <h1
            className="transition-all duration-500 ease-in-out font-light 
            select-none cursor-pointer text-4xl drop-shadow-md text-gray-900"
          >
            my
            <span className="font-extrabold text-teal-400">comps</span>
            <span className="font-semibold text-gray-400 text-sm ml-1">
              .de
            </span>
          </h1>
          <p className="text-gray-400 text-xs">Level Up Your Competition</p>
        </Link>
      </div>
      <StaticHeaderNav />
      <div className="flex items-center gap-4">
        <Link href="/login">
          <button
            className="hover:underline transition-all duration-150
          text-gray-400 font-semibold text-lg "
          >
            Anmelden
          </button>
        </Link>
        <Link href="/register">
          <button
            className="bg-teal-400 hover:bg-teal-500 transition-all duration-150
          text-white font-semibold text-lg px-4 py-2 rounded-md"
          >
            Registrieren
          </button>
        </Link>
      </div>
    </header>
  );
};

export default StaticHeader;
