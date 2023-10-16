"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PlacesAutocomplete from "./places-autocomplete";

const LIBRARIES = ["places"] as any;

const CompsMap = () => {
  const { userLocation, refetchUserLocation } = useUserInfo();
  const [selected, setSelected] = useState(null);

  const centerCoordinates = useMemo(
    () => (userLocation ? userLocation : { lat: 51.1657, lng: 10.4515 }),
    [userLocation]
  );

  useEffect(() => {
    if (!userLocation) {
      refetchUserLocation();
    }
  }, [userLocation]);

  useEffect(() => {
    console.log("SELECTED", selected);
  }, [selected]);

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      mapIds={["72f6e6ba729abf79"]}
      libraries={LIBRARIES}
      loadingElement={
        <div className="h-full w-full flex items-center justify-center">
          <Loader2 size={48} className="text-teal-400 animate-spin" />
        </div>
      }
    >
      <div className="h-full w-full relative">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={selected ? selected : centerCoordinates}
          zoom={13}
          options={{
            mapId: "72f6e6ba729abf79",
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <div className="absolute top-4 left-0 right-0">
            <PlacesAutocomplete setSelected={setSelected} />
          </div>
          {userLocation ? <MarkerF position={centerCoordinates} /> : null}
          {selected ? <MarkerF position={selected} /> : null}
        </GoogleMap>
      </div>
    </LoadScriptNext>
  );
};

export default CompsMap;
