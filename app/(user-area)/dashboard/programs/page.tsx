import CompsBoard from "@/components/user-dashboard/comps-board";
import ProgramBoard from "@/components/user-dashboard/program-board";
import CompetitionModalProvider from "@/providers/competition-modal.provider";

const ProgramsPage = ({
  searchParams,
}: {
  searchParams: { program_id?: string };
}) => {
  const programId = searchParams.program_id
    ? (searchParams.program_id as string)
    : undefined;
  return (
    <section className="flex-1 w-full overflow-y-auto bg-gray-50 py-6 sm:py-8 lg:py-10 xl:py-12 flex flex-col items-center">
      <ProgramBoard programId={programId} />
    </section>
  );
};

export default ProgramsPage;
