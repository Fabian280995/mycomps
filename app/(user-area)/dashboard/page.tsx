import DashboardHeader from "@/components/user-dashboard/dashboard-header";
import InfoBoard from "@/components/user-dashboard/info-board";

const DashboardSetupPage = () => {
  return (
    <section className="flex-1 w-full overflow-y-auto bg-gray-50 padding-x py-6 sm:py-8 lg:py-10 xl:py-12 flex flex-col items-center">
      <DashboardHeader />
      <InfoBoard />
    </section>
  );
};

export default DashboardSetupPage;
