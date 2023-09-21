"use client";
import Link from "next/link";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { routes } from "@/lib/constants";

interface Props {
  main?: boolean;
}

const MainHeader = ({ main = false }: Props) => {
  const [isScrolled, setIsScrolled] = React.useState(!main);
  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollY, setPrevScrollY] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = document.documentElement.scrollTop;

      console.log("SCROLL_Y:", scrollY);
      console.log("PREV_SCROLL_Y:", prevScrollY);

      if (scrollY >= 90) {
        setIsScrolled(true);
      }

      if (scrollY < 90 && main) {
        setIsScrolled(false);
      }

      if (scrollY > prevScrollY && (main ? scrollY > 500 : scrollY > 0)) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setPrevScrollY(scrollY);
    };

    if (mobileMenuOpen) return;

    if (document.documentElement.scrollTop > 0) {
      setIsScrolled(true);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY, mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all
      ${isScrolled && "bg-white"}
      ${
        isVisible /* 
          ? "translate-y-0 pointer-events-auto"
          : "-translate-y-[100%] pointer-events-none" */
      }`}
    >
      <div
        className={`flex justify-between items-center px-2 sm:px-4 md:px-8 lg:px-12 py-6
        w-full h-[5rem]`}
      >
        <div
          className={`flex w-full justify-between items-center sm:items-end transition-all duration-500 ease-in-out
          ${!isScrolled && "translate-y-[110%] px-4 md:px-8"}
        `}
        >
          <h1
            className={`transition-all duration-500 ease-in-out font-light 
            select-none cursor-pointer 
            ${
              isScrolled
                ? "text-gray-900 text-3xl"
                : "text-white drop-shadow-dark text-4xl"
            }
        `}
            onClick={() => router.push("/")}
          >
            my
            <span className="font-extrabold text-teal-400">comps</span>
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
                    before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-teal-400
                    before:transition-all before:duration-200 before:ease-in-out hover:before:w-full text-xl
                    ${
                      isScrolled
                        ? "text-gray-600"
                        : "text-white drop-shadow-dark "
                    }
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
            <Menu
              className={`w-8 h-8 ${
                isScrolled ? "text-gray-600" : "text-white drop-shadow-dark "
              }`}
            />
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

export default MainHeader;
