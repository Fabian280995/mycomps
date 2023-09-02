"use client";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ArrowBigDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  autoSlideInterval?: number;
}

const Carousel: React.FC<Props> = ({
  children: slides,
  autoSlideInterval = 3000,
}) => {
  const [current, setCurrent] = useState(0);
  const [autoSlideActive, setAutoSlideActive] = useState(true);

  const { height, width } = useWindowDimensions();

  if (!Array.isArray(slides)) return null;

  let intervalId: NodeJS.Timeout;
  /* const prev = () =>
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1)); */
  const next = () =>
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

  const onGetStarted = () => {
    window.scrollTo({
      top: height,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!autoSlideActive) return;
    intervalId = setInterval(next, autoSlideInterval);
    return () => clearInterval(intervalId);
  }, [autoSlideActive, autoSlideInterval]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-[3000ms]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute bottom-0 top-0 right-0 p-4">
        <div className="flex flex-col h-full items-center justify-center gap-3">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 rounded-full select-none
                ${current === i ? "scale-[1.05] bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h2 className="text-2xl sm:text-4xl mx-6 sm:mx-0 text-center font-bold text-white drop-shadow-dark">
          Entdecke jetzt deine Leidenschaft!
        </h2>
        <button
          className="px-8 py-4 mt-4 sm:mt-8 text-white bg-emerald-600 rounded-full shadow-lg hover:bg-emerald-500
          transition-all duration-200 ease-in-out"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex w-full justify-center">
        <ArrowBigDown className="w-8 h-8 text-white/60 animate-bounce" />
      </div>
    </div>
  );
};

export default Carousel;
