import { Competition } from "@/types";
import queryString from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/competitions`;

export interface CompetitionsQuery {
  startDate?: Date;
  sportId?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

export const getCompetitionsByLocation = async (
  query: CompetitionsQuery
): Promise<Competition[]> => {
  const options = {
    method: "GET",
  };

  if (!query.lat || !query.lng || !query.radius)
    throw new Error("Missing location parameters");

  const url = queryString.stringifyUrl({
    url: `${URL}/locations`,
    query: {
      sportId: query.sportId,
      startDate: query.startDate?.toString(),
      searchTerm: query.searchTerm,
      lat: query.lat,
      lng: query.lng,
      radius: query.radius,
    },
  });

  const res = await fetch(url, options);
  return res.json();
};

export const getCompetitions = async (
  query: CompetitionsQuery
): Promise<{
  pagination: {
    total: number;
  };
  data: Competition[];
}> => {
  const options = {
    method: "GET",
  };

  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      sportId: query.sportId,
      startDate: query.startDate?.toString(),
      searchTerm: query.searchTerm,
      page: query.page,
      limit: query.limit,
    },
  });

  const res = await fetch(url, options);
  return res.json();
};
