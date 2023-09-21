import React from "react";

const MonthIndicator = ({ month }: { month: string }) => {
  return (
    <div className="flex items-center gap-4">
      <hr className="w-1/12 lg:w-1/12 border-0 h-0.5 rounded-full bg-gray-300" />
      <h2 className="font-black text-gray-400 uppercase text-base">{month}</h2>
    </div>
  );
};

export default MonthIndicator;
