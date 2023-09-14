import React from "react";
import Link from "next/link";
import StaticHeaderNav from "./nav";

const StaticHeader = () => {
  return (
    <header className="bg-white border-b">
      <div
        className="flex justify-between items-center px-2 sm:px-4 md:px-8 lg:px-12 py-6
        w-full h-[5rem] max-w-7xl mx-auto"
      >
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between items-center sm:items-end transition-all duration-500 ease-in-out">
            <Link href="/">
              <h1
                className="transition-all duration-500 ease-in-out font-light 
            select-none cursor-pointer text-3xl"
              >
                my
                <span className="font-extrabold text-emerald-600">comps</span>
                <span className="font-semibold text-gray-400 text-sm ml-1">
                  .de
                </span>
              </h1>
            </Link>
          </div>
        </div>
        <StaticHeaderNav />
      </div>
    </header>
  );
};

export default StaticHeader;
