import React from "react";

const MonthIndicator = ({ month }: { month: string }) => {
  return (
    <div className="flex items-center gap-4">
      <hr className="w-56 border-0 h-0.5 rounded-full bg-gradient-to-l from-teal-400 to-purple-400" />
      <h2 className="font-black text-gray-700 uppercase text-xl">{month}</h2>
      <hr
        className="w-full border-0 h-0.5 rounded-full bg-gradient-to-l
      from-gray-50 to-gray-400"
      />
    </div>
  );
};

export default MonthIndicator;
