"use client";
import { Competition } from "@/types";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CompCard from "@/components/comps/comp-card";
import { useIntersection } from "@mantine/hooks";
import queryString from "query-string";
import MonthIndicator from "@/components/comps/month-indicator";
import { compQueryParams } from "@/components/comps-overview";
import { Loader } from "lucide-react";
import { sortCompsByMonth } from "@/lib/functions/sortComps";
import { motion } from "framer-motion";

const PAGE_LIMIT = 12;

const getCompetitions = async ({
  page,
  query,
}: {
  page: number;
  query: compQueryParams;
}) => {
  const url = queryString.stringifyUrl({
    url: "http://localhost:3001/api/competitions" /* "https://mycomps-cms.vercel.app/api/competitions" */,
    query: {
      page,
      sportId: query.sportId,
      searchTerm: query.searchTerm,
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

const CompetitionsList = ({
  query: { sportId, startDate, searchTerm },
}: Props) => {
  const [compsByMonth, setCompsByMonth] = React.useState<
    { [key: string]: Competition[] } | undefined
  >(undefined);
  const [lastCompId, setLastCompId] = React.useState<string | null>(null);
  const [canNextPage, setCanNextPage] = React.useState(true);

  const {
    data,
    refetch,
    fetchNextPage,
    isFetching: loading,
  } = useInfiniteQuery(
    ["query", { sportId, startDate, searchTerm }],
    async ({ pageParam = 1 }) => {
      const response = await getCompetitions({
        page: pageParam,
        query: { sportId, startDate, searchTerm },
      });
      console.log("RESPONSE", response);
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

  useEffect(() => {
    refetch();
  }, [sportId, startDate, searchTerm]);

  return (
    <div className="my-12 space-y-24">
      <div>
        {loading && (
          <motion.div
            layout
            className="w-full flex flex-col items-center justify-center mt-12 mb-6"
          >
            <Loader size={24} className="animate-spin text-gray-300" />
            <p className="text-sm text-gray-300">suche nach Änderungen...</p>
          </motion.div>
        )}
        {compsByMonth &&
          Object.keys(compsByMonth).map((month) => {
            if (!compsByMonth[month].length) {
              return null;
            }
            return (
              <motion.section layout key={month} className="padding-x">
                <MonthIndicator month={month} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
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
              </motion.section>
            );
          })}
      </div>
      {!canNextPage ? (
        <div className="w-full flex justify-center mt-12">
          <div className="bg-white rounded-full px-6 py-3 text-gray-400">
            Du bist am Ende angekommen!
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CompetitionsList;
