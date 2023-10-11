import DashboardHeader from "@/components/user-dashboard/dashboard-header";
import InfoBoard from "@/components/user-dashboard/info-board";

const DashboardSetupPage = () => {
  return (
    <section className="flex flex-col items-center">
      <DashboardHeader />
      <InfoBoard />
    </section>
  );
};

export default DashboardSetupPage;
