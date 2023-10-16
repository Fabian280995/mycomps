"use client";
import { getProgramById } from "@/lib/actions/programs.actions";
import { TrainingsProgram } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const ActivePlan = ({ programId }: { programId: string }) => {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery<TrainingsProgram>(
    ["programs", programId],
    async () => {
      try {
        const token = await getToken();
        const data = await getProgramById(token!, programId);
        return data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
    }
  );

  return (
    <div className="flex flex-col w-full h-full justify-between gap-2">
      <h5 className="text-gray-300 text-base font-semibold">Aktiver Plan</h5>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="text-xs text-gray-200 text-center">
            Lade Trainingsplan...
          </span>
        </div>
      ) : data ? (
        <div className="flex-1 w-full flex flex-col">
          <h6 className="text-gray-700 text-base font-semibold">{data.name}</h6>
          <div className="flex items-center justify-between gap-2">
            <p className="text-gray-400 font-semibold text-xs">
              {data.sessions ? data.sessions.length : 0} Sessions
            </p>
            <p className="text-gray-400 font-semibold text-xs">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <span className="text-xs text-gray-200 text-center">
          Du hast noch keinen Trainingsplan ausgewählt.
        </span>
      )}
    </div>
  );
};

export default ActivePlan;
