import React from "react";
import getSportsByCategory from "@/lib/actions/getSportsByCategories";
import SportsCategoryList from "./sports/sports-category-list";
import SectionHeader from "./ui/section-header";
import InfoContainer from "./design/info-container";

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
    <div className="padding-x">
      <InfoContainer title="Sieh dir an, welche Sportarten wir bereits unterstützen.">
        <div className="flex gap-6 flex-wrap mt-8">
          {Object.keys(sportsByCategory).map((category) => (
            <SportsCategoryList
              title={categoryTranslations[category]}
              sports={sportsByCategory[category]}
              key={category}
            />
          ))}
        </div>
      </InfoContainer>
    </div>
  );
};

export default SportsOverview;
