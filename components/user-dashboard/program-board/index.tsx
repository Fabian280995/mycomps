"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SessionsBoard from "./sessions-board";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getProgramById } from "@/lib/actions/programs.actions";
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";

interface Props {
  programId?: string;
}

const ProgramBoard = ({ programId }: Props) => {
  const { userInfo, isLoading: userInfoLoading } = useUserInfo();
  const { getToken } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["program", programId],
    async () => {
      try {
        const token = await getToken();
        const res = await getProgramById(token!, programId!);
        return res;
      } catch (error) {
        console.error(error);
      }
    },
    { enabled: !!programId }
  );

  useEffect(() => {
    if (!programId && userInfo) {
      router.push(`/dashboard/programs?program_id=${userInfo.activeProgramId}`);
    }
  }, [userInfo, programId]);

  return userInfoLoading || isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <p className="font-semibold text-sm text-gray-300">
        Suche nach Trainingsplänen...
      </p>
    </div>
  ) : (
    <div className="flex flex-col w-full gap-4 h-full">
      <h2 className={cn("text-xl font-semibold text-gray-700 padding-x")}>
        Trainingsplan: {!data ? "" : data.name}
      </h2>
      <div className="w-full h-full overflow-x-auto padding-x -mx-6 no-scrollbar">
        <SessionsBoard sessions={data.sessions} programId={data.id} />
      </div>
    </div>
  );
};

export default ProgramBoard;
