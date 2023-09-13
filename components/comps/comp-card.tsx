import { Competition } from "@/types";
import {
  Calendar,
  CalendarCheck,
  CalendarCheck2,
  Home,
  Loader2,
  MapPin,
  Pin,
  User2,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  comp: Competition | null;
}

const CompCard = ({ comp }: Props) => {
  const start = comp
    ? new Date(comp.startDate).toLocaleDateString("de-DE")
    : "";
  const end = comp ? new Date(comp.endDate).toLocaleDateString("de-DE") : "";

  const infos = [
    {
      icon: <User2 className="w-5 h-5 text-gray-500" />,
      text: comp ? comp.organizer.name : "",
    },
    {
      icon: <MapPin className="w-5 h-5 text-gray-500" />,
      text: comp
        ? `${comp.location.address.zip} ${comp.location.address.city}, ${comp.location.address.street} ${comp.location.address.number}`
        : "",
    },
    {
      icon: <Home className="w-5 h-5 text-gray-500" />,
      text: comp ? comp.location.name : "",
    },
    {
      icon: <Calendar className="w-5 h-5 text-gray-500" />,
      text: comp
        ? `${start} ${comp.startDate === comp.endDate ? "" : `- ${end}`}`
        : "",
    },
  ];

  return (
    <div className="min-w-[16rem] h-full">
      {comp ? (
        <div
          className="relative w-full h-full border-2 flex flex-col bg-white shadow-sm rounded-md overflow-hidden
        cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md transition-all duration-150"
        >
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={comp.logo.url}
              alt={comp.name}
              fill
              sizes="100%"
              className="object-cover object-center"
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <div className="flex">
              <h4 className="text-lg font-semibold text-zinc-800 truncate">
                {comp.name}
              </h4>
            </div>
            <div className="flex flex-col gap-y-2 justify-around pb-4">
              {infos.map((info, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  {info.icon}
                  <p className="text-md text-gray-500 truncate">{info.text}</p>
                </div>
              ))}
            </div>
          </div>
          {comp.sport.image?.url ? (
            <div className="absolute bottom-2 right-2 border border-white rounded-full p-2">
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
      ) : (
        <div className="relative flex items-center justify-center w-full h-full bg-white shadow-sm rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default CompCard;
