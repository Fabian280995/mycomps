"use client";
import { Slideshow } from "@/types";
import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface SlideshowProps {
  slideshow: Slideshow;
}

const Slideshow = ({ slideshow }: SlideshowProps) => {
  const { slides } = slideshow;
  const [current, setCurrent] = React.useState<number>(0);
  const [imageDelay, setImageDelay] = React.useState<number>(0);

  let intervalId: NodeJS.Timeout;
  const next = (index: number) => {
    if (index === slides.length - 1) {
      setImageDelay(1000);
    } else {
      setImageDelay(0);
    }
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    intervalId = setInterval(() => next(current), 7000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full transform h-screen padding-x overflow-hidden">
      <div className="relative h-full flex max-md:flex-col w-full items-center justify-center p-4 gap-8">
        <div className="w-full max-md:mt-6 flex flex-col justify-center z-20">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-teal-400 drop-shadow-md"
            style={{
              // shadow as textborder
              textShadow:
                "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
            }}
          >
            {slideshow.name}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 md:mt-6 text-gray-900 drop-shadow-md">
            {slides[0].description}
          </p>
          <button
            type="button"
            className="px-6 py-3 mt-4 sm:mt-8 text-white bg-teal-400
            rounded-full shadow-lg hover:bg-teal-500 border border-white
            transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs"
            onClick={() => {
              window.scrollTo({
                top: document.getElementById("main-filter-bar")?.offsetTop,
                behavior: "smooth",
              });
            }}
          >
            <p className="text-sm md:text-lg font-semibold text-white">
              Jetzt entdecken!
            </p>
          </button>
        </div>
        <div className="relative overflow-visible w-full">
          <div
            className="flex w-full items-center overflow-visible transition-all duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const isActive = current === i;
              return (
                <div
                  key={slide.id + i}
                  className={cn(
                    "relative min-w-full aspect-[3/2] shadow-md transition-all duration-300 overflow-hidden",
                    `delay-${imageDelay}`,
                    isActive ? "scale-100" : "scale-90 opacity-60",
                    i < current ? "grayscale opacity-5" : "grayscale-0"
                  )}
                >
                  <Image
                    src={slide.image.url}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  {!isActive && i < current ? (
                    <div
                      className="absolute w-full h-full inset-0 bg-white/60
                        backdrop-filter backdrop-blur-sm"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
