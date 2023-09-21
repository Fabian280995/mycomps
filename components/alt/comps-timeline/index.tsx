"use client";
import { Competition } from "@/types";
import React, { useEffect, useState } from "react";
import MonthIndicator from "./month-indicator";
import CompCard from "../../comps/comp-card";
import Link from "next/link";
import { compQueryParams } from "@/components/alt/competitions/page";

interface Props {
  comps: Competition[];
  selectedSportIds?: string[];
  query: compQueryParams;
  totalComps: number;
  compsLimit: number;
}

const joinCompsToLoadedComps = (
  prevComps: Competition[],
  newComps: Competition[]
) => {
  if (!prevComps.length) {
    return newComps;
  }

  const joinedComps = newComps.reduce((acc, comp) => {
    const existingComp = acc.find((c) => c.id === comp.id);
    if (existingComp) {
      return acc;
    }
    return [...acc, comp];
  }, prevComps);

  return joinedComps;
};

const sortLoadedCompsByMonth = (comps: Competition[]) => {
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

const CompsTimeline = ({
  comps,
  selectedSportIds,
  query,
  totalComps,
  compsLimit,
}: Props) => {
  const totalPages = Math.ceil(totalComps / compsLimit);
  const [moreCompsLoadable, setMoreCompsLoadable] = useState<boolean>(true);
  const [currenPage, setCurrentPage] = useState<number>(query.page || 1);
  const [loadedComps, setLoadedComps] = useState<Competition[]>([]);
  const [compsByMonth, setCompsByMonth] = useState<
    { [key: string]: Competition[] } | undefined
  >();

  useEffect(() => {
    if (comps.length) {
      setLoadedComps(joinCompsToLoadedComps(loadedComps, comps));
    }
  }, [comps]);

  useEffect(() => {
    if (loadedComps.length) {
      setCompsByMonth(sortLoadedCompsByMonth(loadedComps));
    }
    if (loadedComps.length >= totalComps /* ‚ */) {
      setMoreCompsLoadable(false);
    } else {
      setMoreCompsLoadable(true);
    }
    setCurrentPage(Math.ceil(loadedComps.length / compsLimit));
  }, [loadedComps]);

  return (
    <>
      <div className="flex flex-col gap-8 bg-white rounded-md pt-10 w-full mb-12">
        <span className="padding-x">
          total competitions loaded: {loadedComps.length}
        </span>
        {query.page &&
        query.page > 1 &&
        loadedComps.length < query.page * compsLimit ? (
          <div className="w-full flex justify-center">
            <Link
              href={{
                pathname: "/competitions",
                query: {
                  ...query,
                  page: 1,
                },
              }}
              scroll={false}
              type="button"
              className="bg-gradient-to-r from-teal-400 to bg-purple-400 p-0.5 overflow-hidden
        rounded-full shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95
        "
            >
              <div className="w-full bg-white rounded-full px-6 py-3">
                Zum Anfang
              </div>
            </Link>
          </div>
        ) : null}
        {compsByMonth && Object.keys(compsByMonth).length !== 0 && (
          <div className="flex flex-col gap-12">
            {Object.keys(compsByMonth).map((month) => {
              if (!compsByMonth[month].length) {
                return null;
              }
              if (
                query.sports &&
                query.sports.length &&
                !compsByMonth[month].filter((comp) =>
                  query.sports?.includes(comp.sport.id)
                ).length
              ) {
                return null;
              }
              return (
                <div key={month}>
                  <MonthIndicator month={month} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6 padding-x">
                    {compsByMonth[month].map((comp) => {
                      if (
                        selectedSportIds &&
                        selectedSportIds.length &&
                        !selectedSportIds.includes(comp.sport.id)
                      ) {
                        return null;
                      }
                      return <CompCard key={comp.id} comp={comp} />;
                    })}
                  </div>
                </div>
              );
            })}
            <div className="w-full flex justify-center">
              {moreCompsLoadable ? (
                <Link
                  href={{
                    pathname: "/competitions",
                    query: {
                      ...query,
                      page: currenPage + 1,
                    },
                  }}
                  scroll={false}
                  type="button"
                  className="bg-gradient-to-r from-teal-400 to bg-purple-400 p-0.5 overflow-hidden
                rounded-full shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95
                "
                >
                  <div className="w-full bg-white rounded-full px-6 py-3">
                    Mehr anzeigen
                  </div>
                </Link>
              ) : (
                <div
                  className="bg-gradient-to-r from-gray-400 to bg-purple-400 p-0.5 overflow-hidden
              rounded-full scale-95
              "
                >
                  <div className="w-full bg-white rounded-full px-6 py-3 text-gray-400">
                    Hier geht es nicht mehr weiter...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompsTimeline;
