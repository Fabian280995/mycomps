import CompsMap from "@/components/maps/comps-map";
import { LoadScriptNext } from "@react-google-maps/api";
import React from "react";

const CompsMapPage = () => {
  return (
    <div className="flex-1 w-full">
      <CompsMap />
    </div>
  );
};

export default CompsMapPage;
