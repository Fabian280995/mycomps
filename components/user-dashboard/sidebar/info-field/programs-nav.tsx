"use client";
import { getPrograms } from "@/lib/actions/programs.actions";
import { TrainingsProgram } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProgramsNav = () => {
  const programId = useSearchParams().get("program_id");
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery<TrainingsProgram[]>(
    ["programs"],
    async () => {
      try {
        const token = await getToken();
        const data = await getPrograms(token!);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h5 className="text-gray-300 text-base font-semibold">Trainingspläne</h5>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="text-xs text-gray-200 text-center">
            Lade Trainingspläne...
          </span>
        </div>
      ) : data ? (
        <ul className="flex-1 w-full flex flex-col">
          {data.map((program, index) => {
            const selected = programId === program.id;
            return (
              <motion.li
                key={program.id}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="flex items-center w-full gap-2"
              >
                <div>
                  <div className="w-3 h-3 border rounded-full flex items-center justify-center">
                    {selected && (
                      <motion.div
                        key={program.id + "_indicator"}
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="w-2 h-2 bg-teal-400 rounded-full
                        "
                      />
                    )}
                  </div>
                </div>
                <Link
                  href={`/dashboard/programs?program_id=${program.id}`}
                  className={cn(
                    "text-base font-semibold truncate ",
                    selected
                      ? "text-gray-700"
                      : "hover:text-gray-700 text-gray-500"
                  )}
                >
                  {program.name}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <span className="text-xs text-gray-200 text-center">
          Du hast noch keinen Trainingsplan ausgewählt.
        </span>
      )}
    </div>
  );
};

export default ProgramsNav;
