import { cn } from "@/lib/cn";
import { Sport } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  sports: Sport[];
  selectedSportIds?: string[];
}

const FilterBar = ({ sports, selectedSportIds }: Props) => {
  const sportsSortedByName = sports.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    return nameA > nameB ? 1 : -1;
  });

  return (
    <div className="flex items-center gap-6 padding-x sticky top-0 z-50 py-2 bg-white">
      <div className="flex gap-6 overflow-x-scroll no-scrollbar">
        {sportsSortedByName.map((sport) => {
          const isSelected = selectedSportIds?.includes(sport.id);
          return (
            <Link
              href={{
                pathname: "/competitions",
                query: {
                  sports: selectedSportIds?.includes(sport.id)
                    ? selectedSportIds?.filter((id) => id !== sport.id)
                    : [...(selectedSportIds || []), sport.id],
                },
              }}
              key={sport.id}
              className="relative flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
            >
              <Image
                src={sport.image.url}
                alt={sport.name}
                width={32}
                height={32}
              />
              <p className="text-gray-700 font-bold mb-1">{sport.name}</p>
              <hr
                className={cn(
                  "absolute bottom-0 left-0 border-0 h-0.5 w-full opacity-0 transition-all",
                  isSelected
                    ? "opacity-100 bg-teal-500"
                    : "bg-teal-400/40 group-hover:opacity-100"
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
