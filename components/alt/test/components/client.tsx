"use client";
import { Competition } from "@/types";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CompCard from "@/components/comps/comp-card";
import { useIntersection } from "@mantine/hooks";
import { compQueryParams } from "../page";
import queryString from "query-string";
import MonthIndicator from "@/components/alt/comps-timeline/month-indicator";
import CompCardSceleton from "@/components/comps/comp-card-sceleton";

const PAGE_LIMIT = 12;

const getCompetitions = async ({
  page,
  query,
}: {
  page: number;
  query: compQueryParams;
}) => {
  const url = queryString.stringifyUrl({
    url: "http://localhost:3000/api/competitions",
    query: {
      page,
      sportId: query.sportId,
      startDate: query.startDate?.toString(),
      limit: PAGE_LIMIT,
    },
  });

  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

interface Props {
  query: compQueryParams;
}

const sortCompsByMonth = (comps: Competition[]) => {
  let compsByMonth: { [key: string]: Competition[] } = {};
  const allMonths = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  compsByMonth = allMonths.reduce((acc, month) => {
    const monthComps = comps.filter(
      (comp) =>
        new Date(comp.startDate).toLocaleString("de-DE", {
          month: "long",
        }) === month
    );
    return {
      ...acc,
      [month]: monthComps,
    };
  }, {} as { [key: string]: Competition[] });

  return compsByMonth;
};

const TestClient = ({ query: { sportId, startDate } }: Props) => {
  const [compsByMonth, setCompsByMonth] = React.useState<
    { [key: string]: Competition[] } | undefined
  >(undefined);
  const [lastCompId, setLastCompId] = React.useState<string | null>(null);
  const [canNextPage, setCanNextPage] = React.useState(true);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query", { sportId, startDate }],
    async ({ pageParam = 1 }) => {
      const response = await getCompetitions({
        page: pageParam,
        query: { sportId, startDate },
      });
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
    }
  );

  const lastCompRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastCompRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting && canNextPage) {
    fetchNextPage();
  }

  useEffect(() => {
    if (!data) return;
    const _comps = data?.pages.flatMap((page) => page.data);
    if (!_comps.length) return;
    setCanNextPage(
      _comps.length < data.pages[data.pages.length - 1].pagination.total
    );
    setLastCompId(_comps[_comps.length - 1].id);
    setCompsByMonth(sortCompsByMonth(_comps));
  }, [data]);

  return (
    <div className="py-12">
      {compsByMonth &&
        Object.keys(compsByMonth).map((month) => {
          if (!compsByMonth[month].length) {
            return null;
          }
          return (
            <div key={month}>
              <MonthIndicator month={month} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6 padding-x">
                {compsByMonth[month].map((comp) => {
                  if (lastCompId === comp.id) {
                    return (
                      <div ref={ref} key={comp.id}>
                        <CompCard comp={comp} />
                      </div>
                    );
                  }
                  return <CompCard key={comp.id} comp={comp} />;
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TestClient;
