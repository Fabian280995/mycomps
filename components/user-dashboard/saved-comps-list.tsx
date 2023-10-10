"use client";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import CompCard from "../comps/comp-card";
import CompCardSceleton from "../comps/comp-card-sceleton";

const SavedCompsList = ({ compIds }: { compIds: string[] }) => {
  const result = useQueries({
    queries: compIds.map((id) => ({
      queryKey: ["comp", id],
      queryFn: async () => {
        const res = await fetch(
          `https://mycomps-cms.vercel.app/api/competitions/${id}`
        );
        const data = await res.json();
        return data;
      },
    })),
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-6">
        {result.map((res, index) => {
          if (res.isLoading) return <CompCardSceleton key={index} />;
          if (res.error) return <div key={index}>Error!</div>;
          return <CompCard key={res.data.id} comp={res.data} />;
        })}
      </div>
    </div>
  );
};

export default SavedCompsList;
