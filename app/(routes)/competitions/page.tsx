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
    <section className="w-full my-12">
      <div className="flex flex-col gap-8 bg-white rounded-md py-20 px-16 shadow-md">
        <SectionHeader title="Wettkampfplaner" />
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
