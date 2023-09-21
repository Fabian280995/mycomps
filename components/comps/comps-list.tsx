"use client";
import { Competition } from "@/types";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CompCard from "@/components/comps/comp-card";
import { useIntersection } from "@mantine/hooks";
import queryString from "query-string";
import MonthIndicator from "@/components/comps/month-indicator";
import { compQueryParams } from "@/components/comps-overview";
import Link from "next/link";
import { Loader } from "lucide-react";

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

const CompetitionsList = ({ query: { sportId, startDate } }: Props) => {
  const [compsByMonth, setCompsByMonth] = React.useState<
    { [key: string]: Competition[] } | undefined
  >(undefined);
  const [lastCompId, setLastCompId] = React.useState<string | null>(null);
  const [canNextPage, setCanNextPage] = React.useState(true);
  const [canLoadPreviousComps, setCanLoadPreviousComps] = React.useState(true);

  const {
    data,
    fetchNextPage,
    isFetching: loading,
  } = useInfiniteQuery(
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
    setCanLoadPreviousComps(
      data.pages[data.pages.length - 1].pagination.previous > 0
    );

    setLastCompId(_comps[_comps.length - 1].id);
    setCompsByMonth(sortCompsByMonth(_comps));
  }, [data]);

  return (
    <>
      {startDate && canLoadPreviousComps ? (
        <div className="w-full flex justify-center mt-24">
          <Link
            href={{
              pathname: "/",
              query: {
                sportId,
                startDate: new Date(
                  startDate.getTime() - 7 * 24 * 60 * 60 * 1000
                ).toISOString(),
              },
            }}
            scroll={false}
            type="button"
            className="bg-teal-400 p-0.5 overflow-hidden
            rounded-full shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95"
          >
            <div className="w-full bg-white rounded-full px-6 py-3">
              {loading ? (
                <Loader className="w-6 h-6 text-gray-700 animate-spin" />
              ) : (
                "Frühere Wettkämpfe laden"
              )}
            </div>
          </Link>
        </div>
      ) : null}
      <div className="py-6">
        {compsByMonth &&
          Object.keys(compsByMonth).map((month) => {
            if (!compsByMonth[month].length) {
              return null;
            }
            return (
              <div key={month} className="mt-12">
                <MonthIndicator month={month} />
                <section className="w-full flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-6 padding-x">
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
                </section>
              </div>
            );
          })}
        {!canNextPage ? (
          <div className="w-full flex justify-center mt-12">
            <div
              className="bg-gradient-to-r from-gray-400 to bg-teal-400 p-0.5 overflow-hidden
          rounded-full scale-95"
            >
              <div className="w-full bg-white rounded-full px-6 py-3 text-gray-400">
                Du bist am Ende angekommen!
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CompetitionsList;
