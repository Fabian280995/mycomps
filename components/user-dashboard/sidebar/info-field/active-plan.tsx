"use client";
import { getActiveProgram } from "@/lib/actions/programs.actions";
import { TrainingsProgram } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const ActivePlan = ({ programId }: { programId: string }) => {
  const { getToken } = useAuth();
  const { data, error, isLoading } = useQuery<TrainingsProgram>(
    ["programs", programId],
    async () => {
      try {
        const token = await getToken();
        const data = await getActiveProgram(token!, programId);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  return (
    <>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="text-xs text-gray-200 text-center">
            Lade Trainingsplan...
          </span>
        </div>
      ) : data ? (
        <div className=""></div>
      ) : (
        <>
          <h5 className="text-gray-400 text-base font-semibold">
            Aktiver Plan
          </h5>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-xs text-gray-200 text-center">
              Du hast noch keine Trainingspläne.
            </span>
          </div>
          {/* 
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-md">
            <div className="w-3/4 h-full bg-teal-400"></div>
          </div> */}
        </>
      )}
    </>
  );
};

export default ActivePlan;
