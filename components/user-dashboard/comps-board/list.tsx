"use client";
import CompCard from "@/components/comps/comp-card";
import CompCardSceleton from "@/components/comps/comp-card-sceleton";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import { motion } from "framer-motion";

const CompsList = ({ compIds }: { compIds: string[] }) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-6">
        {result.map((res, index) => {
          if (res.isLoading)
            return (
              <motion.div
                initial={{
                  y: 200,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.2,
                  delay: index * 0.1,
                }}
                key={index}
              >
                <CompCardSceleton />
              </motion.div>
            );
          if (res.error) return <div key={index}>Error!</div>;
          return (
            <div key={res.data.id}>
              <CompCard comp={res.data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompsList;
