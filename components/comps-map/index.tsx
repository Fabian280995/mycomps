"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import { LoadScriptNext } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import MapView from "./map-view";

const LIBRARIES = ["places"] as any;

const CompsMap = () => {
  const { userLocation, refetchUserLocation } = useUserInfo();
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

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
        {userLocation ? (
          <MapView
            initialLocation={userLocation}
            googleLoaded={googleLoaded}
            map={map}
            setMap={setMap}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Loader2 size={48} className="text-teal-400 animate-spin" />
            <p className="text-gray-400 font-semibold text-lg ml-4">
              Standort wird ermittelt...
            </p>
          </div>
        )}
      </div>
    </LoadScriptNext>
  );
};

export default CompsMap;
