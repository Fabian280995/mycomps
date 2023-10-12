"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SessionsBoard from "./sessions-board";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getProgramById } from "@/lib/actions/programs.actions";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface Props {
  programId?: string;
}

const ProgramBoard = ({ programId }: Props) => {
  const { userInfo, isLoading } = useUserInfo();
  const { getToken } = useAuth();
  const router = useRouter();
  const { data } = useQuery(
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
  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className={cn("text-xl font-semibold text-gray-700")}>
        Trainingsplan: {!data ? "" : data.name}
      </h2>
      <SessionsBoard />
    </div>
  );
};

export default ProgramBoard;
