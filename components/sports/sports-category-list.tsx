import { Sport } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  sports: Sport[];
}

const SportsCategoryList = ({ title, sports }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold text-gray-500 ml-2">{title}</h4>
      <div className="flex flex-col gap-2">
        {sports.map((sport) => (
          <div
            className="group flex gap-2 items-center cursor-pointer"
            key={sport.id}
          >
            <div
              className="w-12 h-12 border border-white overflow-hidden rounded-full p-2
            flex items-center justify-center group-hover:border-gray-400"
            >
              <Image
                src={sport.image.url}
                width={50}
                height={50}
                alt={sport.name}
                className=" object-cover object-center"
              />
            </div>
            <p className="text-gray-700 group-hover:underline">{sport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsCategoryList;
