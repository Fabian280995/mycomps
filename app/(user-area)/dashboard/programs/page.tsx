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
    <section className="w-full">
      <ProgramBoard programId={programId} />
    </section>
  );
};

export default ProgramsPage;
