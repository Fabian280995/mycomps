"use client";
import { reduceCompsToMonths } from "@/lib/functions/comp-planer";
import { getStartAndEndDateForMonth } from "@/lib/functions/date";
import { Sport } from "@/types";
import React from "react";

interface Props {
  sports: Sport[];
  selectedSports: Sport[];
  onSelectSport: (sport: Sport) => void;
  compMonths?: Date[];
  onReset: () => void;
}

const FilterBar = ({
  sports,
  selectedSports,
  onSelectSport,
  compMonths,
  onReset,
}: Props) => {
  const [prepTime, setPrepTime] = React.useState<number>(0);
  const currentDate = new Date();

  /* // Aktuelles Jahr und Monat ermitteln
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() - 6; // Monate sind 0-basiert, daher +1 hinzufügen

  // Funktion aufrufen, um den aktuellen Monat zu erhalten
  const currentMonthDates = getStartAndEndDateForMonth(
    currentYear,
    currentMonth
  );

  // Ausgabe der Ergebnisse
  console.log(
    currentMonthDates.startDate.toLocaleString(),
    "-",
    currentMonthDates.endDate.toLocaleString()
  ); */

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 flex-1">
        {sports.length > 0 ? (
          sports.map((sport) => {
            const isSelected = selectedSports.find((s) => s.id === sport.id);
            return (
              <button
                key={sport.id}
                onClick={() => onSelectSport(sport)}
                className={`${
                  isSelected
                    ? "bg-emerald-200 border-emerald-200 hover:bg-emerald-200 text-black"
                    : " text-gray-600 hover:bg-gray-200 border-gray-200"
                } flex-grow-0 flex-shrink-0 flex items-center justify-center px-4 py-2
                rounded-full font-semibold transition-colors duration-100 ease-in-out 
                hover:text-black border-2 text-base`}
              >
                {sport.name}
              </button>
            );
          })
        ) : (
          <p className="text-gray-400 font-semibold">
            Keine Sportarten zum filtern vorhanden...
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <label
            htmlFor="prepTime"
            className="inline-block text-base text-gray-600 font-semibold
            "
          >
            Vorbereitungszeit:
            {prepTime >= 1 ? (
              <p className="ml-2 inline-block font-semibold text-sm text-gray-400">{`${prepTime} Wochen`}</p>
            ) : (
              ""
            )}
          </label>
          <div className="mt-2">
            <input
              type="range"
              name="prepTime"
              id="prepTime"
              className="block w-full h-2 bg-gray-200 rounded-full appearance-none
              accent-emerald-600 cursor-pointer "
              defaultValue={1}
              min={1}
              max={60}
              onChange={(e) => setPrepTime(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className=" flex items-center justify-center hover:underline underline-offset-2
          font-bold text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed
          disabled:no-underline"
          onClick={onReset}
          disabled={selectedSports.length === 0 && prepTime === 0}
        >
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
