import React from "react";
import CompsList from "./comps/comps-list";
import { getDateRange } from "@/lib/functions/date";
import SectionHeader from "./ui/section-header";
import NavigationButton from "./ui/nav-btn";

const CompsOverview = async () => {
  const range = 30;
  const dates = getDateRange(30);

  return (
    <section className="w-full space-y-24">
      <div className="bg-white shadow-md py-20">
        <div className="flex flex-col gap-y-4 items-center px-8 md:px-12 lg:px-16 w-full">
          <h2 className="h2-green">
            Bist du bereit für deinen nächsten Wettkampf?
          </h2>
          <p className="text-gray-600 font-semibold text-2xl">
            Starte jetzt mit unserem Wettkampfplaner und hebe ab zu neuen
            Höchstleistungen!
          </p>
          <NavigationButton
            href="/competitions"
            title="Jetzt zum Wettkampfplaner!"
          />
          <p className="text-gray-400 font-semibold">
            mycomps.de - dein Schlüssel zu noch mehr Erfolg!
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="px-16">
          <SectionHeader
            title="Kommende Wettkämpfe"
            subtitle={`Sieh dir die Wettkämpfe der kommenden ${range} Tage an.`}
          />
        </div>
        <CompsList
          filter={{
            startDate: dates.start,
            endDate: dates.end,
          }}
        />
      </div>
    </section>
  );
};

export default CompsOverview;
