"use client";
import { routes } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const StaticHeaderNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <div>
      <nav className="hidden sm:block">
        <ul className="flex gap-6">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="relative transition-all duration-500 ease-in-out
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-purple-400
                before:transition-all before:duration-200 before:ease-in-out hover:before:w-full text-xl"
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
        <Menu className="w-8 h-8" />
      </button>
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
    </div>
  );
};

export default StaticHeaderNav;
