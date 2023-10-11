import CompsBoard from "@/components/user-dashboard/comps-board";

const CompetitionsPage = () => {
  return (
    <section className="w-full min-h-screen">
      <h2 className="text-xl font-semibold text-gray-400">
        Diese Wettkämpfe kommen für dich in Frage
      </h2>
      <CompsBoard />
    </section>
  );
};

export default CompetitionsPage;
