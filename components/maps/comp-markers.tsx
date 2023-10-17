"use client";
import getCompetitions from "@/lib/actions/getCompetitions";
import { MarkerF } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CompMarkers = () => {
  const [nothingFound, setNothingFound] = useState(false);
  const { data, isLoading } = useQuery(
    ["competitions" /* , { sportId, startDate, searchTerm } */],

    async () => {
      const response = await getCompetitions({
        /* query: { sportId, startDate, searchTerm }, */
      });
      if (response.data.length === 0) setNothingFound(true);
      else setNothingFound(false);
      return response;
    }
  );
  return (
    <>
      {!isLoading && data
        ? data.data.map((comp) => (
            <MarkerF
              key={comp.id}
              position={{
                lat: comp.location.address.lat,
                lng: comp.location.address.lng,
              }}
              icon={{
                url: "/comp-location.png",
                scaledSize: new google.maps.Size(18, 18),
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-gray-800">
                  {comp.location.address.city}
                </p>
                <p className="text-xs font-semibold text-gray-800">
                  {comp.location.address.street}
                </p>
              </div>
            </MarkerF>
          ))
        : null}
    </>
  );
};

export default CompMarkers;
