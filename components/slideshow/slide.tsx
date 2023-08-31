"use client";
import React from "react";

import Image from "next/image";
import { Slide } from "@/types";

interface Props {
  slide: Slide;
}

const Slide = ({ slide }: Props) => {
  return (
    <div className="relative min-w-full h-screen">
      <Image
        src={slide.image.url}
        alt={slide.title}
        fill
        sizes="100vw"
        loading="eager"
        quality={75}
        className="object-cover object-center"
      />
      <div className="bg-black/50 absolute inset-0" />
    </div>
  );
};

export default Slide;
