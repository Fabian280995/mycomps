"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { Activity, Badge, Dumbbell, Trophy } from "lucide-react";
import React from "react";
import CountInfoCard from "./count-info-card";

const InfoBoard = () => {
  const { userInfo } = useUserInfo();
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CountInfoCard
          title="Wettkämpfe"
          href="/dashboard/competitions"
          icon={<Trophy className="w-6 h-6" />}
          count={userInfo?.compIds.length}
        />
        <CountInfoCard
          title="Trainingspläne"
          href="/dashboard/programs"
          limit={1} // Anzahl maximal möglicher Trainingspläne
          icon={<Dumbbell className="w-6 h-6" />}
          count={undefined}
        />
        <CountInfoCard
          title="Einheiten"
          subtitle="aktiver Plan"
          href="/dashboard/programs"
          limit={6 * 4} // 6 Trainingswochen mit jeweils 4 Einheiten
          icon={<Activity className="w-6 h-6" />}
          count={undefined}
        />
      </div>
    </div>
  );
};

export default InfoBoard;
