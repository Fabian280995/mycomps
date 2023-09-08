"use client";
import CompCard from "@/components/comps/comp-card";
import FilterBar from "@/components/comps/filter-bar";
import SectionHeader from "@/components/ui/section-header";
import { Competition } from "@/types";
import React, { useState } from "react";

interface Props {
  competitions: Competition[];
}

const CompetitionsClient = ({ competitions }: Props) => {
  const [filteredComps, setFilteredComps] = useState<string[] | null>(null);

  const handleFilteredCompsChange = (compIds: string[]) => {
    if (compIds.length > 0) {
      setFilteredComps(compIds);
    } else {
      setFilteredComps(null);
    }
  };

  return (
    <div className="mt-28 space-y-8 bg-white rounded-md py-20 px-16 shadow-md">
      <SectionHeader
        title="Der Wettkampfplaner"
        subtitle="Willkommen im Wettkampfplaner, finde hier deinen passenden Wettkampf!
        Verwende die Filter um alle Vorraussetzungen zu schaffen, die optimale Herausforderung für dich zu finden."
      />
      <FilterBar
        competitions={competitions}
        onFilteredCompsChange={handleFilteredCompsChange}
        onFilterReset={() => setFilteredComps(null)}
      />
      {competitions.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {competitions.map((comp) => {
            if (filteredComps && !filteredComps.find((id) => id === comp.id)) {
              return null;
            }
            return <CompCard key={comp.id} comp={comp} />;
          })}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center">
          <hr className="w-full border-gray-200 absolute z-0 " />
          <p className="text-gray-400 font-semibold z-10 bg-white p-4">
            Keine Wettkämpfe gefunden...
          </p>
        </div>
      )}
    </div>
  );
};

export default CompetitionsClient;
