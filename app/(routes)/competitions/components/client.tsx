"use client";
import CompCard from "@/components/comps/comp-card";
import FilterBar from "@/components/comps/filter-bar";
import SectionHeader from "@/components/ui/section-header";
import {
  getSportsFromCompetitions,
  getMonthsFromComps,
} from "@/lib/functions/comp-planer";
import { Competition, Sport } from "@/types";
import React from "react";

interface Props {
  competitions: Competition[];
}

const CompetitionsClient = ({ competitions }: Props) => {
  const sports = getSportsFromCompetitions(competitions);
  const months = getMonthsFromComps(competitions);
  const [selectedSports, setSelectedSports] = React.useState<Sport[]>([]);

  console.log(months);

  const handleSelectSport = (sport: Sport) => {
    if (selectedSports.find((s) => s === sport)) {
      setSelectedSports(selectedSports.filter((s) => s.id !== sport.id));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleReset = () => {
    setSelectedSports([]);
  };

  return (
    <div className="mt-28 space-y-8 bg-white rounded-md py-20 px-16 shadow-md">
      <SectionHeader
        title="Wettkämpfe"
        subtitle="Alle Wettkämpfe in der Übersicht."
      />
      <FilterBar
        sports={sports}
        selectedSports={selectedSports}
        onSelectSport={handleSelectSport}
        onReset={handleReset}
      />
      {competitions.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {competitions.map((comp) => {
            if (
              selectedSports.length > 0 &&
              !selectedSports.find((s) => s.id === comp.sport.id)
            )
              return null;

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
