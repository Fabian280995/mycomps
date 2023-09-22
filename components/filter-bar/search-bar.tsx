"use client";
import React, { useEffect } from "react";
import {
  Grip,
  LucideRefreshCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import useDebounce from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

interface Props {
  searchTerm?: string;
}
const LINK_PATHNAME = "/home";

const SearchBar = ({ searchTerm }: Props) => {
  const [searchValue, setSearchValue] = React.useState(searchTerm ?? "");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(`?$search=${searchValue}`, { scroll: false });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`?$searchTerm=${debouncedSearchTerm}`, { scroll: false });
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full h-[3rem] flex items-center gap-2">
      <div className="flex items-center gap-2 h-full w-full">
        <button
          type="button"
          className="min-w-[3rem] h-[3rem] flex items-center justify-center bg-white border border-gray-400 overflow-hidden
          rounded-full  transition-all hover:scale-105 hover:shadow-md active:scale-95 shadow-md"
          onClick={() => null}
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </button>
        <form
          onSubmit={onSubmit}
          className="px-3 flex items-center bg-white rounded-full border border-gray-400 w-full h-full shadow-md max-w-lg"
        >
          <button type="submit">
            <Search
              className={cn(
                "w-6 h-6",
                searchValue ? "text-teal-400" : "text-gray-400"
              )}
            />
          </button>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Wettkampf suchen..."
            className="bg-transparent outline-none border-none placeholder-gray-400 ml-2 py-2
            w-full text-gray-700 placeholder:text-gray-400 text-sm md:text-base"
          />
        </form>
      </div>
      <Link
        scroll={false}
        href={{
          pathname: LINK_PATHNAME,
        }}
        className="min-w-[3rem] h-[3rem] flex items-center justify-center bg-white border border-gray-400 overflow-hidden
        rounded-full  transition-all hover:scale-105 hover:shadow-md active:scale-95 shadow-md self-end"
      >
        <LucideRefreshCcw className="w-6 h-6 text-gray-400" />
      </Link>
    </div>
  );
};

export default SearchBar;
