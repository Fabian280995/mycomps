"use client";
import React from "react";
import ActivePlan from "./active-plan";
import { usePathname } from "next/navigation";
import ProgramsNav from "./programs-nav";

const InfoField = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex-1 border border-gray-200 w-full h-full rounded-xl px-4 py-3 flex flex-col justify-between">
      {!(pathname === "/dashboard/programs") ? <ActivePlan /> : <ProgramsNav />}
    </div>
  );
};

export default InfoField;
