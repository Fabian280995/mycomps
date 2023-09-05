import { Sport } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sports`;

const getSportsByCategory = async (): Promise<{ [key: string]: Sport[] }> => {
  const res = await fetch(URL);
  const data = await res.json();

  // Verwende reduce, um die Sportarten nach Kategorien zu gruppieren
  const sportsByCategory = data.reduce(
    (acc: { [key: string]: Sport[] }, sport: Sport) => {
      const { category } = sport;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(sport);
      return acc;
    },
    {}
  );

  return sportsByCategory;
};

export default getSportsByCategory;
