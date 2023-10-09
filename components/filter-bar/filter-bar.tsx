import { Sport } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { compQueryParams } from "@/components/comps-overview";
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";

interface Props {
  sports: Sport[];
  query: compQueryParams;
}

const LINK_PATHNAME = "/";
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
    <div
      id="main-filter-bar"
      className="flex items-center justify-between gap-6 padding-x sticky top-0 z-40 border-b
        border-b-gray-400 bg-white shadow-md"
    >
      <ul className="relative flex overflow-x-scroll overflow-y-hidden no-scrollbar flex-1 pt-4 pb-8">
        {sportsSortedByName.map((sport) => {
          const isSelected = query.sportId === sport.id;
          return (
            <li
              key={sport.id}
              className={cn(
                "active:scale-95 transition-all cursor-pointer",
                !isSelected ? "hover:scale-110" : "hover:scale-100"
              )}
              style={{
                width: `${LINK_WIDTH}rem`,
                minWidth: `${LINK_WIDTH}rem`,
              }}
            >
              <Link
                href={{
                  pathname: LINK_PATHNAME,
                  query: {
                    sportId: isSelected ? undefined : sport.id,
                    startDate: query.startDate?.toISOString(),
                  },
                }}
                scroll={false}
                className="text-center items-center"
                prefetch={false}
              >
                <Image
                  src={sport.image.url}
                  alt={sport.name}
                  width={28}
                  height={28}
                  className="mx-auto"
                />
                <p className="text-gray-700 font-semibold text-sm truncate">
                  {sport.name}
                </p>
              </Link>
            </li>
          );
        })}
        <div
          className="absolute top-0 left-0 h-0.5 transition-all duration-500
          px-6"
          style={{
            width: `${LINK_WIDTH}rem`,
            transform: `translateX(${LINK_WIDTH * selectedSportIndex}rem)
            `,
          }}
        >
          <span className="h-full w-full bg-gray-900 block" />
        </div>
      </ul>
      <div
        className="absolute bottom-0 left-0 right-0 w-full padding-x
      translate-y-1/2"
      >
        <SearchBar searchTerm={query.searchTerm} />
      </div>
    </div>
  );
};

export default FilterBar;
