import { Sport } from "@/types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface Props {
  filterActive: boolean;
  sports: Sport[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function NewFilterBar({
  filterActive,
  searchParams,
  sports,
}: Props) {
  const selectedSports = Array.isArray(searchParams.sports)
    ? searchParams.sports
    : searchParams.sports
    ? [searchParams.sports]
    : [];

  return (
    <div
      className={`w-full rounded-3xl border overflow-hidden
    `}
    >
      {filterActive ? (
        <div className=" flex flex-col gap-8 p-4">
          <div className="flex gap-2 items-center ">
            {sports.map((sport, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/competitions",
                  query: {
                    filterActive: filterActive,
                    sports: selectedSports?.includes(sport.id)
                      ? selectedSports?.filter((id) => id !== sport.id)
                      : [...(selectedSports || []), sport.id],
                  },
                }}
                scroll={false}
                className={`bg-gray-100 px-4 py-1 rounded-full border-2 ${
                  selectedSports?.includes(sport.id)
                    ? "border-emerald-200 text-gray-700"
                    : "border-gray-100 text-gray-500"
                }`}
              >
                {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
              </Link>
            ))}
          </div>
          <Link
            href={{
              pathname: "/competitions",
            }}
            className="text-sm text-gray-600 font-semibold h-full rounded-full
              text-left self-end hover:underline "
          >
            Filter schließen
          </Link>
        </div>
      ) : (
        <Link
          href={{
            pathname: "/competitions",
            query: {
              filterActive: true,
            },
          }}
          className="text-base text-gray-600 font-semibold w-full h-full
          text-left px-6 py-2 hover:bg-gray-100 flex items-center"
        >
          Filtern
          <SlidersHorizontal className="w-4 h-4 text-gray-500 inline-block ml-2" />
        </Link>
      )}
    </div>
  );
}
