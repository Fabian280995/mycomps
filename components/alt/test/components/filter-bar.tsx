import { Sport } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { compQueryParams } from "../page";
import { cn } from "@/lib/cn";

interface Props {
  sports: Sport[];
  query: compQueryParams;
}

const LINK_PATHNAME = "/test";
const LINK_WIDTH = 6;

const FilterBar = ({ sports, query }: Props) => {
  const sportsSortedByName = sports.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    return nameA > nameB ? 1 : -1;
  });
  const selectedSportIndex = sports.findIndex(
    (sport) => sport.id === query.sportId
  );

  return (
    <div className="flex items-center justify-between gap-6 padding-x sticky top-0 z-20 py-2 border-b bg-white">
      <ul className="relative flex overflow-x-scroll no-scrollbar flex-1">
        {sportsSortedByName.map((sport) => {
          const isSelected = query.sportId === sport.id;
          return (
            <li
              key={sport.id}
              className={cn(
                "px-2 py-1 active:scale-95 transition-all cursor-pointer",
                !isSelected ? "hover:scale-110" : ""
              )}
              style={{
                width: `${LINK_WIDTH}rem`,
              }}
            >
              <Link
                href={{
                  pathname: LINK_PATHNAME,
                  query: {
                    sportId: isSelected ? undefined : sport.id,
                  },
                }}
                scroll={false}
                className="text-center items-center"
              >
                <Image
                  src={sport.image.url}
                  alt={sport.name}
                  width={28}
                  height={28}
                  className="mx-auto"
                />
                <p className="text-gray-700 font-bold text-sm mb-1 truncate">
                  {sport.name}
                </p>
              </Link>
            </li>
          );
        })}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 rounded-full translate-y-[50%]
          px-8"
          style={{
            width: `${LINK_WIDTH}rem`,
            transform: `translateX(${LINK_WIDTH * selectedSportIndex}rem)`,
          }}
        >
          <span className="h-full w-full bg-teal-400 rounded-full block" />
        </div>
      </ul>
      {query.sportId ? (
        <Link
          href={{
            pathname: LINK_PATHNAME,
          }}
          className="text-sm text-gray-600 font-semibold h-full rounded-full text-left self-end hover:underline "
        >
          Filter zurücksetzen
        </Link>
      ) : null}
      {/* 
      Adding Search-Component to FilterBar
      <Link
        href={{
          pathname: LINK_PATHNAME,
          query: {
            startDate: query.startDate ? undefined : "",
            sportId: query.sportId ? undefined : "",
            search: true,
          },
        }}
        className="w-10 h-10 bg-white shadow-sm absolute bottom-0 border rounded-full
        translate-y-[50%] flex items-center justify-center cursor-pointer"
      >
        <Search className="w-5 h-5 text-gray-500 mx-auto" />
      </Link> */}
    </div>
  );
};

export default FilterBar;
