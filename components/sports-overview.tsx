import React from "react";
import getSportsByCategory from "@/lib/actions/getSportsByCategories";
import SportsCategoryList from "./sports/sports-category-list";

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
    <div className="w-full bg-white shadow-md py-20 px-16 space-y-8">
      <div className="flex flex-col max-w-7xl mx-auto">
        <h2 className="h2-green">Finde deinen nächsten Wettkampf!</h2>
        <p className="text-gray-600 font-semibold">
          Sieh dir an, welche Sportarten wir bereits unterstützen.
        </p>
      </div>
      <div className="max-w-5xl mx-auto flex gap-6 flex-wrap justify-between">
        {Object.keys(sportsByCategory).map((category) => (
          <SportsCategoryList
            title={categoryTranslations[category]}
            sports={sportsByCategory[category]}
            key={category}
          />
        ))}
      </div>
    </div>
  );
};

export default SportsOverview;
