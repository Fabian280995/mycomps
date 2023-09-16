import getCompetitions from "@/lib/actions/getCompetitions";
import CompsTimeline from "@/components/comps-timeline";
import getSports from "@/lib/actions/getSports";
import FilterBar from "@/components/comps-timeline/filter-bar";

export interface compQueryParams {
  page?: number;
  sports?: string[];
}

export default async function CompetitionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const startDate = new Date();
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const limit = 10;
  const sportIds = Array.isArray(searchParams.sports)
    ? searchParams.sports
    : searchParams.sports
    ? [searchParams.sports]
    : [];
  // competitionsPage holds the competitions and adds new, when page increases
  const competitions = await getCompetitions({
    page,
    limit,
    startDate,
    sportIds: sportIds.length > 0 ? sportIds : undefined,
  });
  const sports = await getSports();

  return (
    <section className="w-full">
      <FilterBar sports={sports} selectedSportIds={sportIds} />
      <CompsTimeline
        comps={competitions}
        selectedSportIds={sportIds}
        query={{
          page,
          sports: sportIds.length > 0 ? sportIds : undefined,
        }}
      />
    </section>
  );
}
