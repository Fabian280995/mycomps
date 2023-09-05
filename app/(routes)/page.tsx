import { Slideshow } from "@/types";

import getHeroSlideshow from "@/lib/actions/getSlideshows";
import Carousel from "@/components/slideshow/carousel";
import Slide from "@/components/slideshow/slide";
import SportsOverview from "@/components/sports-overview";
import Footer from "@/components/footer";
import CompsOverview from "@/components/comps-overview";

export default async function HeroPage() {
  const slideshow: Slideshow = await getHeroSlideshow();

  return (
    <main className="w-full flex flex-col gap-y-24">
      <Carousel autoSlideInterval={7500}>
        {slideshow.slides.map((slide) => (
          <Slide key={slide.id} slide={slide} />
        ))}
      </Carousel>
      <CompsOverview />
      <SportsOverview />
      <Footer />
    </main>
  );
}
