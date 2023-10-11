"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import Link from "next/link";
import React from "react";

const DashboardHeader = () => {
  const { userInfo } = useUserInfo();
  return (
    <div className="w-full h-24 flex items-center justify-between">
      <div className="flex flex-col max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-700">
          Hallo{" "}
          {userInfo
            ? userInfo.firstName
              ? userInfo.firstName
              : userInfo.email
            : "Sportler"}
          !
        </h1>
        <p className="text-sm text-gray-400">
          Manage deine Wettkämpfe und Trainingspläne von hier.{" "}
          <Link href="#" className="text-teal-400 hover:underline">
            mehr
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
