"use client";
import { Competition } from "@/types";
import React, { useEffect, useState } from "react";
import MonthIndicator from "./month-indicator";
import CompCard from "../comps/comp-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { compQueryParams } from "@/app/(routes)/competitions/page";

interface Props {
  comps: Competition[];
  selectedSportIds?: string[];
  query: compQueryParams;
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

  console.log("JOINED_COMPS", joinedComps);

  return joinedComps;
};

const sortLoadedCompsByMonth = (comps: Competition[]) => {
  return comps.reduce((acc, comp) => {
    const month = new Date(comp.startDate).toLocaleString("de-DE", {
      month: "long",
    });
    const monthComps = acc[month] || [];
    return {
      ...acc,
      [month]: [...monthComps, comp],
    };
  }, {} as { [key: string]: Competition[] });
};

const CompsTimeline = ({ comps, selectedSportIds, query }: Props) => {
  const [loadedComps, setLoadedComps] = useState<Competition[]>([]);
  const [compsByMonth, setCompsByMonth] = useState<
    { [key: string]: Competition[] } | undefined
  >();
  const sortedMonth = Object.keys(compsByMonth || {})
    .sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      return dateA > dateB ? 1 : -1;
    })
    .reverse();

  useEffect(() => {
    if (comps.length) {
      setLoadedComps(joinCompsToLoadedComps(loadedComps, comps));
    }
  }, [comps]);

  useEffect(() => {
    if (loadedComps.length) {
      setCompsByMonth(sortLoadedCompsByMonth(loadedComps));
    }
  }, [loadedComps]);

  return (
    <>
      <div className="flex flex-col gap-8 bg-white rounded-md pt-10 w-full mb-12">
        {compsByMonth && Object.keys(compsByMonth).length !== 0 && (
          <div className="flex flex-col gap-12">
            {sortedMonth.map((month) => {
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
              <Link
                href={{
                  pathname: "/competitions",
                  query: {
                    ...query,
                    page: query.page ? query.page + 1 : 2,
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompsTimeline;

/* setLoadedComps((prev) => {
    if (!selectedSportIds || !selectedSportIds.length) {
      return [
        ...prev,
        ...comps.filter((comp) => !prev.filter((c) => c.id === comp.id)),
      ];
    }
    // if there are selectedSportIds, filter if the comps are not already in the loadedComps and if the sportId is in the selectedSportIds
    const filteredLoadedComps = prev.filter((comp) =>
      selectedSportIds.includes(comp.sport.id)
    );
    return [
      ...filteredLoadedComps,
      ...comps.filter(
        (comp) =>
          !filteredLoadedComps.filter((c) => c.id === comp.id).length &&
          selectedSportIds.includes(comp.sport.id)
      ),
    ];
  }); */
