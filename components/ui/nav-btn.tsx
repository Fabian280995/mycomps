"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  href: string;
  icon?: React.ReactNode;
  title: string;
}

const NavigationButton = ({ href, title, icon }: Props) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="px-8 py-4 my-4 sm:mt-8 text-white 
        bg-gradient-to-l from-teal-400 to-emerald-400 rounded-full shadow-sm hover:scale-105 hover:shadow-md
        transition-all duration-200 ease-in-out"
      onClick={() => router.push(href)}
    >
      {icon ? icon : null}
      {title}
    </button>
  );
};

export default NavigationButton;
