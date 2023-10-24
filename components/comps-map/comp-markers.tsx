"use client";
import { getCompetitionsByLocation } from "@/lib/actions/getCompetitions";
import { Competition } from "@/types";
import { InfoWindowF, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { Award, CalendarDays, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  map: google.maps.Map | null;
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
}

const CompMarkers = ({ map, location, radius }: Props) => {
  const [nothingFound, setNothingFound] = useState(false);
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [selectedPos, setSelectedPos] = useState<google.maps.LatLng | null>(
    null
  );
  const { data, isLoading } = useQuery(
    ["competitions", { location, radius }],
    async () => {
      try {
        const response = await getCompetitionsByLocation({
          lat: location.lat,
          lng: location.lng,
          radius,
        });
        return response;
      } catch (error: any) {
        console.error(error.message);

        return {} as Competition[];
      }
    }
  );

  const centerOnMarker = (latlng: google.maps.LatLng) => {
    if (map) {
      map.panTo(latlng);
      map.setZoom(14);
    }
  };

  useEffect(() => {
    console.log("data", data);
    if (!data?.length && !isLoading) {
      setNothingFound(true);
    } else {
      setNothingFound(false);
    }
  }, [data]);

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
      {!isLoading && data?.length ? (
        data.map((comp) => (
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
      ) : (
        <div
          className="
          absolute bottom-6 flex flex-col items-center justify-center bg-white rounded-3xl
          p-4 mx-auto left-0 right-0 max-w-max shadow-lg
        "
        >
          {nothingFound ? (
            <div className="w-full flex flex-col items-center justify-center">
              <p className="text-gray-400 font-semibold text-lg">
                Tut uns leid, diese Suche hat keine Ergebnisse geliefert...
              </p>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Loader2 size={24} className="text-teal-400 animate-spin" />
              <p className="text-gray-400 font-semibold text-lg ml-4">
                Wettkämpfe werden geladen...
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CompMarkers;
