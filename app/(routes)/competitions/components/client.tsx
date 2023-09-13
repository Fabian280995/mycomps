import CompCard from "@/components/comps/comp-card";
import { Competition } from "@/types";

interface Props {
  competitions: Competition[];
}
const CompetitionsClient = ({ competitions }: Props) => {
  return (
    <>
      {competitions.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {competitions.map((comp) => {
            return <CompCard key={comp.id} comp={comp} />;
          })}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center">
          <hr className="w-full border-gray-200 absolute z-0 " />
          <p className="text-gray-400 font-semibold z-10 bg-white p-4">
            Keine Wettkämpfe mit diesen Suchparametern gefunden...
          </p>
        </div>
      )}
    </>
  );
};

export default CompetitionsClient;
