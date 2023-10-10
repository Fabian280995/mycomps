import CompetitionsList from "@/components/comps/comps-list";
import SavedCompsList from "@/components/user-dashboard/saved-comps-list";
import getUserInfo from "@/lib/actions/getUserInfo";
import CompetitionModalProvider from "@/providers/competition-modal.provider";
import { auth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const DashboardSetupPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) => {
  const user = auth();
  if (!user) redirect("/");

  const token = await user.getToken();
  if (!token) redirect("/");
  const userInfo = await getUserInfo(token);

  const competition_id = searchParams.competition_id
    ? (searchParams.competition_id as string)
    : undefined;

  return (
    <>
      <CompetitionModalProvider competition_id={competition_id} />
      <div className="flex flex-col items-center justify-center w-full h-full mt-12">
        <h1 className="text-4xl font-semibold text-gray-900">Dashboard</h1>
        {!userInfo && <Loader2 className="text-gray-400 mt-4 animate-spin" />}
        {userInfo && <SavedCompsList compIds={userInfo.compIds} />}
      </div>
    </>
  );
};

export default DashboardSetupPage;
