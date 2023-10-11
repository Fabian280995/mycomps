"use client";
import React from "react";
import ActivePlan from "./active-plan";
import { usePathname } from "next/navigation";
import ProgramsNav from "./programs-nav";
import { useUserInfo } from "@/providers/user-info.provider";

const InfoField = () => {
  const { userInfo } = useUserInfo();
  const pathname = usePathname();

  return (
    <div className="flex-1 border border-gray-200 w-full h-full rounded-xl px-4 py-3 flex flex-col justify-between">
      {userInfo ? (
        !(pathname === "/dashboard/programs") ? (
          <ActivePlan programId={userInfo.activeProgramId} />
        ) : (
          <ProgramsNav />
        )
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <span className="text-xs text-gray-200 text-center">
            Nutzerdaten noch nicht geladen.
          </span>
        </div>
      )}
    </div>
  );
};

export default InfoField;
