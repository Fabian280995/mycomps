import React from "react";

const MonthIndicator = ({ month }: { month: string }) => {
  return (
    <h2
      className="font-black text-gray-700 uppercase text-xl
      drop-shadow-md
    "
    >
      {month}
    </h2>
  );
};

export default MonthIndicator;
