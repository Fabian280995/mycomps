"use client";
import { cn } from "@/lib/utils";
import { Dumbbell, LayoutDashboard, Trophy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const linkIconStyle = "w-6 h-6";
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className={linkIconStyle} />,
    },
    {
      name: "Wettkämpfe",
      path: "/dashboard/competitions",
      icon: <Trophy className={linkIconStyle} />,
    },
    {
      name: "Trainingspläne",
      path: "/dashboard/programs",
      icon: <Dumbbell className={linkIconStyle} />,
    },
  ];
  return (
    <div className="flex items-start w-full flex-col mt-2">
      <h4 className="text-gray-300 text-base font-bold uppercase">
        Navigation
      </h4>
      <div className="flex flex-col gap-4 mt-2 w-full">
        {routes.map((route, i) => (
          <button
            key={i}
            onClick={() => router.push(route.path)}
            className={cn(
              "w-full flex items-center gap-2 text-lg font-semibold transition-all active:scale-95",
              pathname === route.path
                ? "text-teal-400 scale-105 drop-shadow-md translate-x-1"
                : " text-gray-400"
            )}
          >
            {route.icon}
            <p
              className={cn(
                "transform-gpu transition-all duration-150",
                pathname === route.path ? "text-gray-700" : "text-gray-400"
              )}
            >
              {route.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
