"use client";
import { cn } from "@/lib/utils";
import { Competition } from "@/types";
import { Calendar, Flame, MapPin, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  comp: Competition;
}

const CompCard = ({ comp }: Props) => {
  const [loading, setLoading] = React.useState(true);
  const start = new Date(comp.startDate).toLocaleDateString("de-DE");
  const end = new Date(comp.endDate).toLocaleDateString("de-DE");
  const date = `${start} ${comp.startDate === comp.endDate ? "" : `- ${end}`}`;
  const address = `${comp.location.address.zip} ${comp.location.address.city}, ${comp.location.address.street} ${comp.location.address.number}`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${comp.location.address.street}+${comp.location.address.number}+${comp.location.address.zip}+${comp.location.address.city}`;
  const organizerLink = comp.organizer.url;

  return (
    <div className="w-full h-full max-w-xs">
      <div
        className="relative w-full h-full flex flex-col bg-white shadow-md rounded-3xl overflow-hidden
        cursor-pointer hover:scale-[1.02] hover:-translate-y-2 hover:shadow-lg transition-all duration-150"
      >
        <div className="relative group w-full aspect-[3/2] overflow-hidden bg-gray-200">
          <Image
            src={comp.logo.url}
            alt={comp.name}
            fill
            sizes="100%"
            className={cn(
              "object-cover object-center transition-all duration-500 ease-in-out",
              loading ? "blur-2xl scale-110" : "blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
          {comp.logo.creatorLink ? (
            <a
              href={comp.logo.creatorLink}
              className="absolute bottom-0 right-0 left-0 w-full px-4 py-2 
               truncate text-white/5 group-hover:text-white/70 transition-all duration-150"
            >
              Creator: {comp.logo.creatorLink}
            </a>
          ) : null}
        </div>
        <div className="px-4 py-2 flex flex-col space-y-2">
          <div className="flex">
            <h4 className="text-lg font-semibold text-zinc-800 truncate">
              {comp.name}
            </h4>
          </div>
          <div className="flex flex-col gap-y-2 justify-around">
            <a
              href={organizerLink}
              className="flex items-center gap-x-2 hover:underline text-gray-500 hover:text-gray-900"
            >
              <div className="min-w-6">
                <User2 className="w-5 h-5" />
              </div>
              <p className="text-md truncate ">{comp.organizer.name}</p>
            </a>
            <a
              href={googleMapsLink}
              className="flex items-center gap-x-2 hover:underline text-gray-500 hover:text-gray-900"
            >
              <div className="min-w-6">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-md truncate ">{address}</p>
            </a>
            <div className="flex items-center gap-x-2 text-gray-500">
              <div className="min-w-6">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-md truncate">{date}</p>
            </div>
          </div>
          {comp.enrollmentLink ? (
            <a
              href={comp.enrollmentLink}
              className="bg-teal-400 rounded-md hover:bg-teal-500 transition-all duration-150 px-4 py-2 text-center"
            >
              <p className="text-white font-semibold text-xs">
                direkt einschreiben!
              </p>
            </a>
          ) : (
            <div className="bg-gray-50 rounded-md px-4 py-2 text-center">
              <p className="text-gray-400 font-semibold text-xs">
                kein Link zur Einschreibung verfügbar
              </p>
            </div>
          )}
        </div>
        {false ? (
          <div className="absolute top-2 left-2 rounded-full p-2">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
        ) : null}
        {comp.sport.image?.url ? (
          <div className="bg-white rounded-full p-2 absolute top-2 right-2 border-teal-400 border">
            <Image
              src={comp.sport.image.url}
              alt={comp.sport.name}
              width={24}
              height={24}
              className="object-cover object-center"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CompCard;
