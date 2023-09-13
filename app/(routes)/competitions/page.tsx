import { Competition } from "@/types";

import getCompetitions from "@/lib/actions/getCompetitions";
import CompetitionsClient from "./components/client";
import NewFilterBar from "@/components/comps/new-filter-bar";
import SectionHeader from "@/components/ui/section-header";

export default async function CompetitionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const competitions: Competition[] = await getCompetitions({});
  const sports = competitions.map((comp) => comp.sport);

  const filterActive = searchParams.filterActive ? true : false;
  const filteredComps = filterActive
    ? competitions.filter((comp) => {
        const compSport = comp.sport.id;

        if (searchParams.sports?.includes(compSport)) {
          return true;
        }
        return false;
      })
    : competitions;

  return (
    <section className="w-full flex flex-col gap-y-24 mb-24">
      <div className="mt-28 space-y-8 bg-white rounded-md py-20 px-16 shadow-md">
        <SectionHeader
          title="Der Wettkampfplaner"
          subtitle="Willkommen im Wettkampfplaner, finde hier deinen passenden Wettkampf!
        Verwende die Filter um alle Vorraussetzungen zu schaffen, die optimale Herausforderung für dich zu finden."
        />
        <NewFilterBar
          searchParams={searchParams}
          sports={sports}
          filterActive={filterActive}
        />
        <CompetitionsClient competitions={filteredComps} />
      </div>
    </section>
  );
}
