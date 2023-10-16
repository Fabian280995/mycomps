import CompsBoard from "@/components/user-dashboard/comps-board";
import CompetitionModalProvider from "@/providers/competition-modal.provider";

const CompetitionsPage = ({
  searchParams,
}: {
  searchParams: { competition_id?: string };
}) => {
  const competition_id = searchParams.competition_id
    ? (searchParams.competition_id as string)
    : undefined;
  return (
    <>
      <CompetitionModalProvider competition_id={competition_id} />
      <section className="flex-1 w-full overflow-y-auto bg-gray-50 padding-x py-6 sm:py-8 lg:py-10 xl:py-12 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-400">
          Diese Wettkämpfe kommen für dich in Frage
        </h2>
        <CompsBoard />
      </section>
    </>
  );
};

export default CompetitionsPage;
