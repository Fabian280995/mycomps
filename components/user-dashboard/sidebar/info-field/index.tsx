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
    <div className="border border-gray-200 w-full h-full rounded-xl px-4 py-3 overflow-y-scroll no-scrollbar">
      {userInfo ? (
        !(pathname === "/dashboard/programs") ? (
          <ActivePlan programId={userInfo.activeProgramId} />
        ) : (
          <ProgramsNav />
        )
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-xs text-gray-200 text-center">
            Nutzerdaten noch nicht geladen.
          </span>
        </div>
      )}
    </div>
  );
};

export default InfoField;
