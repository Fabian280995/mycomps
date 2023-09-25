import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-zinc-800 text-white h-[24rem] flex gap-6 justify-center items-center flex-wrap border-t-4
       border-zinc-600 padding-x"
    >
      <div className="flex items-center border-t w-full p-6 justify-between gap-6 flex-wrap text-base">
        <p className="text-gray-200 font-semibold">
          &copy; 2023 | <span className="font-bold">mycomps.de</span> @ fabian
          lessmann
        </p>
        <ul className="flex items-center gap-6 flex-wrap">
          <li>
            <Link href="/impressum">
              <p className="hover:text-gray-400">Impressum</p>
            </Link>
          </li>
          <li>
            <Link href="/cookie-policies">
              <p className="hover:text-gray-400">Cookie-Richtlinien</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="hover:text-gray-400">Über uns</p>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
