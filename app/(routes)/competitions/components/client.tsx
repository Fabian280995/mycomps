import CompCard from "@/components/comps/comp-card";
import SectionHeader from "@/components/ui/section-header";
import { Competition } from "@/types";
import React from "react";

interface Props {
  competitions: Competition[];
}

const CompetitionsClient = ({ competitions }: Props) => {
  return (
    <section>
      <div className="mt-24 space-y-6">
        <SectionHeader
          title="Wettkämpfe"
          subtitle="Alle Wettkämpfe in der Übersicht."
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
          px-12"
        >
          {competitions.map((comp) => (
            <CompCard key={comp.id} comp={comp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsClient;
