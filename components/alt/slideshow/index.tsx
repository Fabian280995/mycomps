import { Slideshow } from "@/types";
import React from "react";
import Carousel from "./carousel";
import Slide from "./slide";

interface SlideshowProps {
  slideshow: Slideshow;
}

const Slideshow = ({ slideshow }: SlideshowProps) => {
  return (
    <Carousel autoSlideInterval={7500}>
      {slideshow.slides.map((slide) => (
        <Slide key={slide.id} slide={slide} />
      ))}
    </Carousel>
  );
};

export default Slideshow;
