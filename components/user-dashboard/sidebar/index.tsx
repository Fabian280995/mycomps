import Brand from "@/components/main-header/brand";
import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { ChevronLeft, Loader2 } from "lucide-react";
import Navigation from "./nav";
import Link from "next/link";
import ExtendedUserButton from "./extended-user-button";
import InfoField from "./info-field";

const Sidebar = async () => {
  return (
    <>
      <div className="fixed top-6 right-8 z-[1000]">
        <ExtendedUserButton />
      </div>
      <div className="w-full md:w-72 h-screen bg-white p-6 border-r">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="group flex w-full items-center gap-1">
            <Link
              href="/"
              className="w-8 h-8 flex items-center justify-center rounded-md translate-y-0.5 text-gray-400 
            group-hover:text-gray-700 duration-300 transition-all group-hover:-translate-x-0.5 group-hover:scale-105"
            >
              <ChevronLeft className="w-8 h-8 " />
            </Link>
            <Brand noHighlight />
          </div>
          <div className="flex-1 w-full overflow-hidden">
            <InfoField />
          </div>
          <div className="w-full">
            <Navigation />
          </div>
          <button
            className="w-full px-6 py-4 bg-teal-400 text-center text-white rounded-sm active:scale-95
        transition-all hover:bg-teal-500"
          >
            Neuer Trainingsplan
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
