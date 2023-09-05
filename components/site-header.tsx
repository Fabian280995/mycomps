"use client";
import { routes } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all`}>
      <div
        className={`flex justify-between items-center px-2 sm:px-4 md:px-8 lg:px-12 py-6
      w-full h-[5rem] max-w-7xl mx-auto`}
      >
        <div
          className={`flex w-full justify-between items-center sm:items-end transition-all duration-500 ease-in-out
        
      `}
        >
          <h1
            className={`transition-all duration-500 ease-in-out font-light 
          select-none cursor-pointer hover:text-emerald-100
          
      `}
            onClick={() => router.push("/")}
          >
            my
            <span className="font-extrabold text-emerald-600">comps</span>
            <span className="font-semibold text-gray-400 text-sm ml-1">
              .de
            </span>
          </h1>
          <nav className="hidden sm:block">
            <ul className="flex gap-6">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`relative transition-all duration-500 ease-in-out
                  before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600
                  before:transition-all before:duration-200 before:ease-in-out hover:before:w-full text-xl
                  
                `}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="hover:bg-white/20 p-2 rounded-xl block sm:hidden"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className={`w-8 h-8 `} />
          </button>
        </div>
      </div>
      {mobileMenuOpen ? (
        <nav
          className={`block fixed inset-0 sm:hidden bg-black/80 w-screen h-screen z-50
        transition-all duration-500 ease-in-out
          ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`flex flex-col items-end gap-8 bg-white w-2/3 absolute right-0 py-8 px-6 h-screen `}
          >
            <button type="button" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-gray-600" />
            </button>
            <ul className="flex flex-col gap-6 w-full items-start">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`relative transition-all duration-500 ease-in-out text-gray-800 text-2xl font-semibold
                  before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-600
                  before:transition-all before:duration-200 before:ease-in-out hover:before:w-full text-xl"text-gray-600"
                  }`}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default SiteHeader;
