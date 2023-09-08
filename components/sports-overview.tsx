import React from "react";
import getSportsByCategory from "@/lib/actions/getSportsByCategories";
import SportsCategoryList from "./sports/sports-category-list";
import SectionHeader from "./ui/section-header";

const SportsOverview = async () => {
  const sportsByCategory = await getSportsByCategory();

  const categoryTranslations: { [key: string]: string } = {
    STRENGTH: "Kraft",
    ENDURANCE: "Ausdauer",
    COMBINED: "Kombinierte Sportarten",
    WATER: "Wassersport",
    WINTER: "Wintersport",
    TEAM: "Teamsport",
    MARTIALARTS: "Kampfsport",
    OTHER: "Andere",
  };

  return (
    <section className="w-full bg-white shadow-md py-20 space-y-8 px-16">
      <SectionHeader
        title="Finde deinen nächsten Wettkampf!"
        subtitle="
          Sieh dir an, welche Sportarten wir bereits unterstützen."
      />
      <div className="max-w-7xl mx-auto flex gap-6 flex-wrap justify-between">
        {Object.keys(sportsByCategory).map((category) => (
          <SportsCategoryList
            title={categoryTranslations[category]}
            sports={sportsByCategory[category]}
            key={category}
          />
        ))}
      </div>
    </section>
  );
};

export default SportsOverview;
