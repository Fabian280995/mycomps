"use client";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  compIds: string[];
}

const CompsNav = ({ compIds }: Props) => {
  const params = useParams();
  const result = useQueries({
    queries: compIds.map((id) => ({
      queryKey: ["comp", id],
      queryFn: async () => {
        const res = await fetch(
          `https://mycomps-cms.vercel.app/api/competitions/${id}`
        );
        const data = await res.json();
        return data;
      },
    })),
  });

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {result.map((res, index) => {
        const selected = !res.isLoading
          ? params.competition_id === res.data.id
          : false;
        return res.isLoading ? (
          <div className="w-full h-6 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
          <button
            type="button"
            key={index}
            className="flex items-center gap-2 hover:translate-x-4 transform-gpu transition-all duration-150"
          >
            <Image
              src={res.data.sport.image.url}
              alt={res.data.name}
              width={24}
              height={24}
              className=""
            />
            <p className="text-gray-900 truncate">{res.data.name}</p>
          </button>
        );
      })}
    </div>
  );
};

export default CompsNav;
