import getCompetitions from "@/lib/actions/getCompetitions";
import CompsTimeline from "@/components/alt/comps-timeline";
import getSports from "@/lib/actions/getSports";
import FilterBar from "@/components/alt/comps-timeline/filter-bar";

export interface compQueryParams {
  page?: number;
  sports?: string[];
}

const COMPETITIONS_LIMIT = 2;

export default async function CompetitionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const startDate = new Date();
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const sportIds = Array.isArray(searchParams.sports)
    ? searchParams.sports
    : searchParams.sports
    ? [searchParams.sports]
    : [];
  // competitionsPage holds the competitions and adds new, when page increases
  const result = await getCompetitions({
    page,
    limit: COMPETITIONS_LIMIT,
    startDate,
    sportIds: sportIds.length > 0 ? sportIds : undefined,
  });
  const sports = await getSports();

  const competitions = result.data;
  return (
    <section className="w-full">
      <FilterBar
        sports={sports}
        selectedSportIds={sportIds}
        query={{
          page,
          sports: sportIds.length > 0 ? sportIds : undefined,
        }}
      />
      <CompsTimeline
        comps={competitions}
        selectedSportIds={sportIds}
        query={{
          page,
          sports: sportIds.length > 0 ? sportIds : undefined,
        }}
        totalComps={result.pagination.total}
        compsLimit={COMPETITIONS_LIMIT}
      />
    </section>
  );
}
