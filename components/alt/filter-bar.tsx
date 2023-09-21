"use client";
import {
  getMonthsFromComps,
  getSportsFromCompetitions,
} from "@/lib/functions/comp-planer";
import { Competition, Sport } from "@/types";
import { Scale, SlidersHorizontal } from "lucide-react";
import React from "react";

interface Props {
  competitions: Competition[];
  onFilteredCompsChange: (compIds: string[]) => void;
  onFilterReset: () => void;
}

export interface compFilter {
  selectedMonthsNumber: number[];
  selectedSportIds: string[];
}

const FilterBar = ({
  competitions,
  onFilteredCompsChange,
  onFilterReset,
}: Props) => {
  const sports = getSportsFromCompetitions(competitions);
  const months = getMonthsFromComps(competitions);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [prepTime, setPrepTime] = React.useState<number>(0);
  const [selectedSports, setSelectedSports] = React.useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = React.useState<number[]>([
    currentMonth,
  ]);

  const handleSelectSport = (sportId: string) => {
    if (selectedSports.find((id) => id === sportId)) {
      setSelectedSports((prev) => prev.filter((s) => s !== sportId));
    } else {
      setSelectedSports((prev) => [...prev, sportId]);
    }
  };

  const handleSelectMonth = (monthNumber: number) => {
    if (selectedMonths.find((number) => number === monthNumber)) {
      setSelectedMonths((prev) => prev.filter((m) => m !== monthNumber));
    } else {
      setSelectedMonths((prev) => [...prev, monthNumber]);
    }
  };

  const handleResetFilter = () => {
    if (active) {
      setSelectedMonths([]);
      setSelectedSports([]);
      setPrepTime(0);
      setActive(false);
      onFilterReset();
    }
  };

  React.useEffect(() => {
    const getFilteredComps = () => {
      const filteredComps = competitions.filter((comp) => {
        const compDate = new Date(comp.startDate);
        const compMonth = new Date(comp.startDate).getMonth() + 1;
        const earliestStartDate = new Date();
        earliestStartDate.setDate(earliestStartDate.getDate() + prepTime * 7);

        if (
          selectedMonths.includes(compMonth) ||
          selectedSports.includes(comp.sport.id)
        ) {
          return true;
        }
        if (prepTime > 0 && compDate > earliestStartDate) {
          return true;
        }
        return false;
      });

      console.log("FILTERED_COMPS:", filteredComps);

      const filteredCompsIds = filteredComps.map((comp) => comp.id);

      console.log(filteredCompsIds);

      onFilteredCompsChange(filteredCompsIds);
    };

    if (
      open &&
      (selectedSports.length > 0 || selectedMonths.length > 0 || prepTime > 0)
    ) {
      setActive(true);
      getFilteredComps();
    } else {
      handleResetFilter();
    }
  }, [selectedMonths, selectedSports, prepTime, open]);

  return (
    <div
      className={`border rounded-xl overflow-hidden
      ${!open ? "hover:bg-gray-200 cursor-pointer relative" : "py-2 px-6"}
    `}
    >
      {!open ? (
        <button
          type="button"
          className="text-lg text-gray-600 font-semibold w-full h-full
          text-left py-2 px-6"
          onClick={() => setOpen(true)}
        >
          Filtern
          <SlidersHorizontal className="w-6 h-6 text-gray-500 inline-block ml-2" />
        </button>
      ) : (
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-base text-gray-600 font-semibold">Sportarten:</p>
            <div className="flex w-full overflow-y-hidden overflow-x-auto no-scrollbar gap-2 flex-1">
              {sports.length > 0 ? (
                sports.map((sport) => {
                  const isSelected = selectedSports.find(
                    (id) => id === sport.id
                  );
                  return (
                    <button
                      key={sport.id}
                      onClick={() => handleSelectSport(sport.id)}
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
                  defaultValue={0}
                  min={0}
                  max={60}
                  onChange={(e) => setPrepTime(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-base text-gray-600 font-semibold">
              Monat - {currentYear}:
            </p>
            <div className="flex w-full overflow-y-hidden overflow-x-auto no-scrollbar gap-2 flex-1">
              {months && months.length > 0 ? (
                months.map((month) => {
                  const isSelected = selectedMonths.find(
                    (n) => n === month.number
                  );
                  return (
                    <button
                      key={month.number}
                      onClick={() => handleSelectMonth(month.number)}
                      className={`${
                        isSelected
                          ? "bg-emerald-200 border-emerald-200 hover:bg-emerald-200 text-black"
                          : " text-gray-600 hover:bg-gray-200 border-gray-200"
                      } flex-grow-0 flex-shrink-0 flex items-center justify-center px-4 py-2
                      rounded-full font-semibold transition-colors duration-100 ease-in-out 
                    hover:text-black border-2 text-base`}
                    >
                      {month.name}
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-400 font-semibold">
                  Keine Sportarten zum filtern vorhanden...
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="button"
              className=" flex items-center justify-center hover:underline underline-offset-2
              font-bold text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed
              disabled:no-underline"
              onClick={handleResetFilter}
            >
              Filter {open ? (active ? "zurücksetzen" : "schließen") : null}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
