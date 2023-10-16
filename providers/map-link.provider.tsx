"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MapLinkProvider = () => {
  const pathname = usePathname();
  const onMapPage = pathname === "/comps-map";
  return (
    <div /* 
      initial={{ scaleX: 0, scaleY: 0.8 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      layout */
      className={cn("fixed -bottom-4 right-4 z-50")}
    >
      <Link
        href={onMapPage ? "/" : "/comps-map"}
        className="bg-teal-400 px-4 py-3 flex items-center
        gap-2 rounded-md shadow-md text-white font-semibold"
      >
        {onMapPage ? (
          "Zur Startseite"
        ) : (
          <>
            <MapPin className="w-6 h-6" />
            Zur Karte
          </>
        )}
      </Link>
    </div>
  );
};

export default MapLinkProvider;
