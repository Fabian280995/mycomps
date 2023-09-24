import React from "react";
import getSports from "@/lib/actions/getSports";

import FilterBar from "@/components/filter-bar/filter-bar";
import CompetitionsList from "@/components/comps/comps-list";

export interface compQueryParams {
  startDate?: Date;
  sportId?: string;
}

const CompetitionsOverview = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const sports = await getSports();
  const sportId = searchParams.sportId
    ? (searchParams.sportId as string)
    : undefined;
  const startDate = searchParams.startDate
    ? new Date(searchParams.startDate as string)
    : new Date();
  startDate.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen">
      <FilterBar
        sports={sports}
        query={{
          startDate,
          sportId,
        }}
      />
      <CompetitionsList
        query={{
          startDate,
          sportId,
        }}
      />
    </div>
  );
};

export default CompetitionsOverview;
