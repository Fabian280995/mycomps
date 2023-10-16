import { cn } from "@/lib/utils";
import Link from "next/link";

const Brand = ({ noHighlight }: { noHighlight?: boolean }) => {
  return (
    <div className="flex items-center transition-all duration-500 ease-in-out">
      <Link href="/">
        <h1
          className={cn(
            "transition-all duration-500 ease-in-out font-semibold",
            "select-none cursor-pointer text-gray-900",
            !noHighlight ? "drop-shadow-md text-4xl" : "text-3xl"
          )}
        >
          my
          <span className="font-bold text-teal-400">comps</span>
          <span className="text-gray-400 text-sm ml-1">.de</span>
        </h1>
        {!noHighlight && (
          <p className="hidden sm:block text-gray-400 text-xs">
            Level Up Your Competition
          </p>
        )}
      </Link>
    </div>
  );
};

export default Brand;
