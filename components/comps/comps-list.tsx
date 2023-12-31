"use client";
import { compQueryParams } from "@/components/comps-overview";
import CompCard from "@/components/comps/comp-card";
import MonthIndicator from "@/components/comps/month-indicator";
import { sortCompsByMonth } from "@/lib/functions/sortComps";
import { Competition } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import queryString from "query-string";
import React, { useEffect, useRef } from "react";

const PAGE_LIMIT = 12;

const getCompetitions = async ({
  page,
  query,
}: {
  page: number;
  query: compQueryParams;
}) => {
  const url = queryString.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}/competitions`,
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
  const [nothingFound, setNothingFound] = React.useState(false);
  const [compsByMonth, setCompsByMonth] = React.useState<
    { [key: string]: Competition[] } | undefined
  >(undefined);
  const [lastCompId, setLastCompId] = React.useState<string | null>(null);
  const [canNextPage, setCanNextPage] = React.useState(true);

  const {
    data,
    fetchNextPage,
    isFetching: loading,
  } = useInfiniteQuery(
    ["competitions", { sportId, startDate, searchTerm }],
    async ({ pageParam = 1 }) => {
      try {
        const response = await getCompetitions({
          page: pageParam,
          query: { sportId, startDate, searchTerm },
        });
        if (response.data.length === 0) setNothingFound(true);
        else setNothingFound(false);
        return response;
      } catch (error) {
        console.error(error);
      }
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
    <div className="my-12 space-y-24 flex flex-col justify-center items-center">
      <section>
        {loading && (
          <div className="w-full flex flex-col items-center justify-center mt-12 mb-6">
            <Loader size={24} className="animate-spin text-gray-300" />
            <p className="text-sm text-gray-300">suche nach Änderungen...</p>
          </div>
        )}
        {!loading && nothingFound ? (
          <div className="w-full flex flex-col items-center justify-center mt-12 mb-6">
            <p className="text-sm text-gray-500">
              Tut uns leid, diese Suche hat keine Ergebnisse geliefert...
            </p>
          </div>
        ) : null}
        {compsByMonth &&
          Object.keys(compsByMonth).map((month) => {
            if (!compsByMonth[month].length) {
              return null;
            }
            return (
              <motion.article
                layout
                key={month}
                className="padding-x space-y-4 py-4"
              >
                <MonthIndicator month={month} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
              </motion.article>
            );
          })}
      </section>
      {!canNextPage ? (
        <footer className="w-full flex justify-center mt-12">
          <div className="bg-white rounded-full px-6 py-3 text-gray-400">
            Du bist am Ende angekommen!
          </div>
        </footer>
      ) : null}
    </div>
  );
};

export default CompetitionsList;
