"use client";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  compIds: string[];
}

const CompsNav = ({ compIds }: Props) => {
  const params = useParams();
  const router = useRouter();
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
    <div className="flex flex-col gap-4 w-full">
      {result.map((res, index) => {
        const selected = !res.isLoading ? params.compId === res.data.id : false;
        return res.isLoading ? (
          <div className="w-full h-6 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
          <div className="relative w-full h-6 flex items-center gap-5">
            {selected && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                layout
                className="w-1 h-1 shadow-md shadow-teal-400 bg-teal-400 rounded-full z-0
                left-1 top-0 bottom-0 absolute my-auto
                "
              />
            )}
            <motion.div layout>
              <button
                type="button"
                key={index}
                className={cn(
                  "flex items-center gap-2 transform-gpu transition-all duration-150 text-base text-gray-700 font-semibold",
                  !selected
                    ? "hover:scale-105"
                    : "pointer-events-none translate-x-4"
                )}
                onClick={() => router.push(`/dashboard/${res.data.id}`)}
              >
                <Image
                  src={res.data.sport.image.url}
                  alt={res.data.name}
                  width={24}
                  height={24}
                  className=""
                />
                <p className="truncate">{res.data.name}</p>
              </button>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default CompsNav;
