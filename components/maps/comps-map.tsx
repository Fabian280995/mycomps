"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { use, useEffect, useMemo, useState } from "react";

import PlacesAutocomplete from "./places-autocomplete";
import CompMarkers from "./comp-markers";

const LIBRARIES = ["places"] as any;

const CompsMap = () => {
  const { userLocation, refetchUserLocation } = useUserInfo();
  const [selected, setSelected] = useState(null);
  const [bounceSelected, setBounceSelected] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const centerCoordinates = useMemo(
    () => (userLocation ? userLocation : { lat: 51.1657, lng: 10.4515 }),
    [userLocation]
  );

  const handleSelected = (selected: any) => {
    setSelected(selected);
    setBounceSelected(true);
    setTimeout(() => {
      setBounceSelected(false);
    }, 2000);
  };

  useEffect(() => {
    if (!userLocation) {
      refetchUserLocation();
    }
  }, [userLocation]);

  useEffect(() => {
    if (typeof google !== "undefined") {
      setGoogleLoaded(true);
    }
  });

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      mapIds={["8ac8ce1fe98c01b4"]}
      libraries={LIBRARIES}
      loadingElement={
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-teal-400 animate-spin" />
          <p className="text-gray-400 font-semibold text-lg ml-4">
            Karte wird geladen...
          </p>
        </div>
      }
    >
      <div className="h-full w-full relative">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={selected ? selected : centerCoordinates}
          zoom={12}
          options={{
            mapId: "8ac8ce1fe98c01b4",
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          <div className="absolute top-4 left-0 right-0">
            <PlacesAutocomplete setSelected={handleSelected} />
            {/* Button to center the user */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2
            bg-white rounded-full shadow-sm border w-10 h-10 flex items-center justify-center
            focus:outline-none"
              onClick={() => {
                refetchUserLocation();
              }}
            >
              <Loader2
                size={24}
                className={`text-gray-400 ${userLocation ? "" : ""}`}
              />
            </button>
          </div>
          {googleLoaded ? (
            <>
              {userLocation ? (
                <MarkerF
                  position={selected ? selected : centerCoordinates}
                  animation={
                    typeof google !== "undefined" && bounceSelected
                      ? google.maps.Animation.BOUNCE
                      : undefined
                  }
                  draggable={true}
                  onDragEnd={(e) => {
                    console.log(e);
                  }}
                  icon={{
                    url: "user-pin.png",
                    scaledSize:
                      typeof google !== "undefined"
                        ? new google.maps.Size(42, 42)
                        : undefined,
                  }}
                />
              ) : null}
              <CompMarkers />
            </>
          ) : null}
        </GoogleMap>
      </div>
    </LoadScriptNext>
  );
};

export default CompsMap;
