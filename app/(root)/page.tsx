import CompetitionsOverview from "@/components/comps-overview";
import ScrollUp from "@/components/ui/scroll-up";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <section className="w-full flex flex-col gap-y-4">
      <CompetitionsOverview searchParams={searchParams} />
      <ScrollUp />
    </section>
  );
}
