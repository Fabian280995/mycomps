import CompetitionsOverview from "@/components/comps-overview";
import Slideshow from "@/components/slideshow";
import ScrollUp from "@/components/ui/scroll-up";
import getHeroSlideshow from "@/lib/actions/getSlideshows";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slideshow = await getHeroSlideshow();
  return (
    <main className="w-full flex flex-col gap-y-4">
      <Slideshow slideshow={slideshow} />
      <CompetitionsOverview searchParams={searchParams} />
      <ScrollUp />
    </main>
  );
}
