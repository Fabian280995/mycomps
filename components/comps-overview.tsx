import getCompetitions from "@/lib/actions/getCompetitions";
import React from "react";
import CompsList from "./comps/comps-list";
import { getDateRange, getWeekDates } from "@/lib/functions/date";

const CompsOverview = async () => {
  const dates = getDateRange(30);

  return (
    <div className="w-full">
      <div className="px-12 ">
        <div className="flex items-center gap-4">
          <h2 className="h2-green">Kommende Wettkämpfe</h2>
        </div>
      </div>
      <CompsList
        filter={{
          startDate: dates.start,
          endDate: dates.end,
        }}
      />
    </div>
  );
};

export default CompsOverview;
