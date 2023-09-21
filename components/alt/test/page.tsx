import React from "react";
import TestClient from "./components/client";
import FilterBar from "./components/filter-bar";
import getSports from "@/lib/actions/getSports";

export interface compQueryParams {
  startDate?: Date;
  sportId?: string;
}

const TestPage = async ({
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
    <div>
      <FilterBar
        sports={sports}
        query={{
          startDate,
          sportId,
        }}
      />
      <TestClient
        query={{
          startDate,
          sportId,
        }}
      />
    </div>
  );
};

export default TestPage;
