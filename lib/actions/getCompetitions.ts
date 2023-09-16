import { Competition } from "@/types";
import queryString from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/competitions`;

export interface CompetitionsQuery {
  locationId?: string;
  startDate?: Date;
  endDate?: Date;
  organizerId?: string;
  sportIds?: string | string[];
  page?: number;
  limit?: number;
}

const getCompetitions = async (
  query: CompetitionsQuery
): Promise<Competition[]> => {
  const options = {
    method: "GET",
  };

  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      locationId: query.locationId,
      organizerId: query.organizerId,
      sportId: query.sportIds,
      startDate: query.startDate?.toString(),
      endDate: query.endDate?.toString(),
      page: query.page,
      limit: query.limit,
    },
  });

  const res = await fetch(url, options);
  return res.json();
};

export default getCompetitions;
