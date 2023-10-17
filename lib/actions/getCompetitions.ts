import { Competition } from "@/types";
import queryString from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/competitions`;

export interface CompetitionsQuery {
  locationId?: string;
  startDate?: Date;
  organizerId?: string;
  sportIds?: string | string[];
  page?: number;
  limit?: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

const getCompetitions = async (
  query: CompetitionsQuery
): Promise<{
  pagination: {
    total: number;
  };
  data: Competition[];
}> => {
  let url;
  const options = {
    method: "GET",
  };

  if (query.lat && query.lng && query.radius) {
    url = queryString.stringifyUrl({
      url: URL,
      query: {
        locationId: query.locationId,
        organizerId: query.organizerId,
        sportId: query.sportIds,
        startDate: query.startDate?.toString(),
        lat: query.lat,
        lng: query.lng,
        radius: query.radius,
      },
    });
  } else {
    url = queryString.stringifyUrl({
      url: URL,
      query: {
        locationId: query.locationId,
        organizerId: query.organizerId,
        sportId: query.sportIds,
        startDate: query.startDate?.toString(),
        page: query.page,
        limit: query.limit,
      },
    });
  }

  const res = await fetch(url, options);
  return res.json();
};

export default getCompetitions;
