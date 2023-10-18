"use client";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MapPinIcon } from "lucide-react";
import CompMarkers from "./comp-markers";
import PlacesAutocomplete from "./places-autocomplete";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface MapViewProps {
  initialLocation: {
    lat: number;
    lng: number;
  };
  googleLoaded: boolean;
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const getLatLng = (latlng: string) => {
  const [lat, lng] = latlng.split(",");
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
};

const MapView: React.FC<MapViewProps> = ({
  initialLocation,
  googleLoaded,
  map,
  setMap,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bounceSelected, setBounceSelected] = useState(false);
  const selectedLocation = searchParams.get("user_location")
    ? getLatLng(searchParams.get("user_location") as string)
    : initialLocation;
  const radius: number = searchParams.get("radius")
    ? parseInt(searchParams.get("radius") as string)
    : 50;

  const handlePush = (selected: any, radius: number) => {
    const newParams = new URLSearchParams(
      `?user_location=${selected.lat},${selected.lng}&radius=${radius}`
    );
    router.push(`?${newParams.toString()}`);
  };

  const handleSelected = useCallback((selected: any) => {
    handlePush(selected, radius);
    setBounceSelected(true);
    setTimeout(() => {
      setBounceSelected(false);
    }, 2000);
  }, []);

  const centerMap = useCallback(() => {
    if (map) {
      map.panTo(selectedLocation);
      map.setZoom(14);
    }
  }, [map, selectedLocation]);

  useEffect(() => {
    if (!(searchParams.get("user_location") || searchParams.get("radius"))) {
      handlePush(selectedLocation, radius);
    }
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={selectedLocation}
      zoom={12}
      options={{
        mapId: "8ac8ce1fe98c01b4",
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
      onLoad={(loadedMap) => {
        setMap(loadedMap);
      }}
    >
      <div className="absolute top-4 left-0 right-0">
        <PlacesAutocomplete setSelected={handleSelected} />
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2
          bg-white rounded-full shadow-md border w-12 h-12 flex items-center justify-center
          focus:outline-none active:scale-90 transition-all duration-200"
          onClick={centerMap}
        >
          <MapPinIcon size={24} className="text-gray-600" />
        </button>
      </div>

      {googleLoaded ? (
        <>
          {selectedLocation && (
            <MarkerF
              position={selectedLocation}
              animation={
                typeof google !== "undefined" && bounceSelected
                  ? google.maps.Animation.BOUNCE
                  : undefined
              }
              draggable={true}
              icon={{
                url: "user-pin.png",
                scaledSize:
                  typeof google !== "undefined"
                    ? new google.maps.Size(42, 42)
                    : undefined,
              }}
              onClick={centerMap}
            />
          )}
          {selectedLocation && radius ? (
            <CompMarkers
              map={map}
              location={selectedLocation}
              radius={radius}
            />
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white rounded-full p-4">
            <p className="text-gray-600 text-lg font-semibold">
              Wettkämpfe werden geladen...
            </p>
          </div>
        </div>
      )}
    </GoogleMap>
  );
};

export default MapView;
