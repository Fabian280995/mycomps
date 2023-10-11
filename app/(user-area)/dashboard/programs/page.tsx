import CompsBoard from "@/components/user-dashboard/comps-board";
import CompetitionModalProvider from "@/providers/competition-modal.provider";

const CompetitionsPage = ({
  searchParams,
}: {
  searchParams: { program_id?: string };
}) => {
  return (
    <>
      <section className="w-full">
        <h2 className="text-xl font-semibold text-gray-400">
          Deine Trainingspläne
        </h2>
      </section>
    </>
  );
};

export default CompetitionsPage;
