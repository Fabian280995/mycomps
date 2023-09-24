import React from "react";

const MonthIndicator = ({ month }: { month: string }) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-black text-gray-700 uppercase text-lg">{month}</h2>
    </div>
  );
};

export default MonthIndicator;
