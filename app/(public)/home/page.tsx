import CompetitionsOverview from "@/components/comps-overview";
import ScrollUp from "@/components/ui/scroll-up";
import { auth } from "@clerk/nextjs";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="w-full flex flex-col gap-y-4">
      <CompetitionsOverview searchParams={searchParams} />
      <ScrollUp />
    </main>
  );
}
