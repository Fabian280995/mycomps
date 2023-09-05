"use client";
import { Competition } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import CompCard from "./comp-card";
import getCompetitions, {
  CompetitionsQuery,
} from "@/lib/actions/getCompetitions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  filter?: CompetitionsQuery;
}

const CompsList = ({ filter }: Props) => {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isInViewport, setIsInViewport] = useState(false);
  const myRef = useRef(null);
  const listRef = useRef<
    HTMLDivElement & { scrollBy: (options: { left: number }) => void }
  >(null);

  const fetchCompetitions = async () => {
    setLoading(true);
    const res = getCompetitions(filter || {});
    res
      .then((data) => {
        setCompetitions(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsInViewport(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (myRef.current) {
      observer.observe(myRef.current);
    }

    return () => {
      if (myRef.current) {
        observer.unobserve(myRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInViewport && !fetched) {
      fetchCompetitions();
      setFetched(true);
    }
  }, [isInViewport]);

  return (
    <div className="relative w-full" ref={myRef}>
      <hr className="absolute my-auto inset-0 w-full border-t-4 border-gray-300 -z-10" />
      <div
        className="flex h-[24rem] w-full overflow-y-hidden overflow-x-auto 
      no-scrollbar snap-x snap snap-mandatory"
        ref={listRef}
      >
        {competitions && !loading ? (
          competitions.map((competition, index) => (
            <div
              className={`snap-start px-2 py-4 ${
                index === 0
                  ? "pl-12"
                  : index === competitions.length - 1
                  ? "pr-12"
                  : ""
              }`}
              key={competition.id}
            >
              <CompCard comp={competition} />
            </div>
          ))
        ) : (
          <div className="px-2 py-4 pl-12">
            <CompCard comp={null} />
          </div>
        )}
      </div>
      <div className="absolute top-1/2 left-2 md:left-6 lg:left-18 -translate-y-1/2">
        <button
          className="group  border w-10 h-10 bg-white rounded-full shadow-md 
          flex items-center justify-center hover:bg-gray-100 transition-all duration-150"
          onClick={() => {
            if (!listRef.current) {
              return;
            }
            listRef.current.scrollBy({
              left: -100,
              behavior: "smooth",
            });
          }}
        >
          <ChevronLeft className="w-6 h-6 text-gray-500 -translate-x-[1px]" />
        </button>
      </div>
      <div className="absolute top-1/2 right-2 md:right-6 lg:right-18 -translate-y-1/2">
        <button
          className="group  border w-10 h-10 bg-white rounded-full shadow-md 
          flex items-center justify-center hover:bg-gray-100 transition-all duration-150"
          onClick={() => {
            if (!listRef.current) {
              return;
            }
            listRef.current.scrollBy({
              left: 100,
              behavior: "smooth",
            });
          }}
        >
          <ChevronRight className="w-6 h-6 text-gray-500 translate-x-[1px]" />
        </button>
      </div>
    </div>
  );
};

export default CompsList;
