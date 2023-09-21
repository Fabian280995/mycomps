import React from "react";
import Link from "next/link";
import StaticHeaderNav from "./nav";

const StaticHeader = () => {
  return (
    <header
      className="flex justify-between items-center padding-x py-6
      w-full h-[5rem] bg-white"
    >
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-between items-center sm:items-end transition-all duration-500 ease-in-out">
          <Link href="/">
            <h1
              className="transition-all duration-500 ease-in-out font-light 
            select-none cursor-pointer text-3xl drop-shadow-md text-gray-900"
            >
              my
              <span className="font-extrabold text-teal-400">comps</span>
              <span className="font-semibold text-gray-400 text-sm ml-1">
                .de
              </span>
            </h1>
          </Link>
        </div>
      </div>
      <StaticHeaderNav />
    </header>
  );
};

export default StaticHeader;
