import DashboardHeader from "@/components/user-dashboard/dashboard-header";
import InfoBoard from "@/components/user-dashboard/info-board";

const DashboardSetupPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) => {
  return (
    <>
      <div className="flex flex-col items-center w-full min-h-screen ">
        <DashboardHeader />
        <InfoBoard />
      </div>
    </>
  );
};

export default DashboardSetupPage;
