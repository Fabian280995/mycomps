"use client";
import getCompetitions from "@/lib/actions/getCompetitions";
import { Competition } from "@/types";
import { InfoWindowF, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { Award, CalendarDays } from "lucide-react";
import { useState } from "react";

interface Props {
  map: google.maps.Map | null;
}

const CompMarkers = ({ map }: Props) => {
  const [nothingFound, setNothingFound] = useState(false);
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [selectedPos, setSelectedPos] = useState<google.maps.LatLng | null>(
    null
  );
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

  const centerOnMarker = (latlng: google.maps.LatLng) => {
    if (map) {
      map.panTo(latlng);
      map.setZoom(14);
    }
  };

  return (
    <>
      {selectedPos ? (
        <InfoWindowF
          position={selectedPos}
          onCloseClick={() => {
            setSelectedComp(null);
            setSelectedPos(null);
          }}
          options={{
            pixelOffset: new google.maps.Size(0, -30),
            ariaLabel: "Wettkampf",
            maxWidth: 320,
          }}
        >
          {selectedComp ? (
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold truncate">
                {selectedComp.name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center font-semibold">
                <Award size={20} className="mr-1" />
                {selectedComp.sport.name}
              </p>
              <p className="text-sm text-gray-500 flex items-center font-semibold">
                <CalendarDays size={20} className="mr-1" />
                {new Date(selectedComp.startDate).toLocaleDateString()} -{" "}
                {new Date(selectedComp.endDate).toLocaleDateString()}
              </p>
            </div>
          ) : null}
        </InfoWindowF>
      ) : null}
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
              title={comp.name}
              onClick={(e: any) => {
                centerOnMarker(e.latLng);
                setSelectedComp(comp);
                setSelectedPos(e.latLng);
              }}
            />
          ))
        : null}
    </>
  );
};

export default CompMarkers;
