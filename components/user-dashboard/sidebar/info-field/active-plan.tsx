import React from "react";

const ActivePlan = () => {
  return (
    <>
      <h5 className="text-gray-400 text-base font-semibold">Aktiver Plan</h5>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-xs text-gray-200 text-center">
          Du hast noch keine Trainingspläne.
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-md">
        <div className="w-3/4 h-full bg-teal-400"></div>
      </div>
    </>
  );
};

export default ActivePlan;
