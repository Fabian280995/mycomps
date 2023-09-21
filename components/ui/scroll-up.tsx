"use client";
import { ArrowBigUp } from "lucide-react";
import React from "react";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className="fixed z-50 flex items-center justify-center w-12 h-12 text-white shadow-md
    bg-gradient-to-bl from-purple-400 to-teal-400 rounded-full bottom-6 right-6 sm:bottom-12 sm:right-12 cursor-pointer"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <ArrowBigUp className="w-8 h-8 drop-shadow-md" />
    </button>
  );
};

export default ScrollUp;
