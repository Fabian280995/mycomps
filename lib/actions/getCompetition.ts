import { Competition } from "@/types";

const getCompetition = async (id: string): Promise<Competition> => {
  const options = {
    method: "GET",
  };
  4;

  const res = await fetch(
    `http://localhost:3001/api/competitions/${id}`,
    options
  );
  return res.json();
};

export default getCompetition;
