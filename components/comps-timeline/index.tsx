import { Competition } from "@/types";
import React from "react";

interface Props {
  comps: Competition[];
}

const CompsTimeline = ({ comps }: Props) => {
  const compsByMonth = comps.reduce((acc, comp) => {
    const month = new Date(comp.startDate).toLocaleString("de-DE", {
      month: "long",
    });
    const monthComps = acc[month] || [];
    return {
      ...acc,
      [month]: [...monthComps, comp],
    };
  }, {} as { [key: string]: Competition[] });

  console.log("compsByMonth", compsByMonth);

  return (
    <div className="max-w-7xl w-full mx-auto mb-12">
      <div className="flex flex-col gap-8 bg-white rounded-md py-20 px-2 shadow-md">
        <div className="flex flex-col gap-8">
          {Object.keys(compsByMonth).map((month) => (
            <div key={month}>
              <div className="flex items-center gap-4">
                <hr className="w-32 border-gray-200 border-0 h-0.5 rounded-full bg-gradient-to-r from-teal-400 to-purple-400" />
                <h2 className="font-black text-gray-700 uppercase">{month}</h2>
              </div>
              <div className="flex flex-col gap-4 px-36 mt-4">
                {compsByMonth[month].map((comp) => (
                  <div
                    key={comp.id}
                    className="flex flex-col gap-2 border border-gray-200 rounded-md p-4"
                  >
                    <h3 className="text-lg font-bold">{comp.name}</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col md:flex-row md:justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Sport</span>
                          <span>{comp.sport.name}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Datum</span>
                          <span>
                            {new Date(comp.startDate).toLocaleString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Ort</span>
                          <span>{comp.location.name}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">Beschreibung</span>
                        <span>{comp.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompsTimeline;
