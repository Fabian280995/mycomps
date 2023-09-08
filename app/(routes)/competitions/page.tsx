import { Competition, Slideshow } from "@/types";

import getHeroSlideshow from "@/lib/actions/getSlideshows";
import Carousel from "@/components/slideshow/carousel";
import Slide from "@/components/slideshow/slide";
import SportsOverview from "@/components/sports-overview";
import Footer from "@/components/footer";
import CompsOverview from "@/components/comps-overview";
import getCompetitions from "@/lib/actions/getCompetitions";
import CompetitionsClient from "./components/client";

export default async function CompetitionsPage() {
  const competitions: Competition[] = await getCompetitions({});

  return (
    <section className="w-full flex flex-col gap-y-24 mb-24">
      <CompetitionsClient competitions={competitions} />
    </section>
  );
}
