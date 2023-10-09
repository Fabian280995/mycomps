"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MapPin, User2, X } from "lucide-react";
import { motion } from "framer-motion";

import { Competition } from "@/types";
import getCompetition from "@/lib/actions/getCompetition";
import EnrollmentLink from "./enrollment-link";

interface CompetitionModalProps {
  compId: string;
}

interface formattedCompetitionProps extends Competition {
  description: string;
  date: string;
  address: string;
  googleMapsLink: string;
  organizerLink: string;
}

const BACK_LINK = "/";

const CompetitionModal = ({ compId }: CompetitionModalProps) => {
  const [formattedCompetition, setFormattedCompetition] = React.useState<
    formattedCompetitionProps | undefined
  >(undefined);
  const router = useRouter();
  const { data: competition, failureCount } = useQuery(
    ["competition", compId],
    () => getCompetition(compId),
    {
      enabled: !!compId,
    }
  );

  useEffect(() => {
    if (competition) {
      const start = new Date(competition.startDate).toLocaleDateString("de-DE");
      const end = new Date(competition.endDate).toLocaleDateString("de-DE");
      setFormattedCompetition({
        ...competition,
        date: `${start} ${
          competition.startDate === competition.endDate ? "" : `- ${end}`
        }`,
        address: `${competition.location.address.zip} ${competition.location.address.city}, ${competition.location.address.street} ${competition.location.address.number}`,
        googleMapsLink: `https://www.google.com/maps/search/?api=1&query=${competition.location.address.street}+${competition.location.address.number}+${competition.location.address.zip}+${competition.location.address.city}`,
        organizerLink: competition.organizer.url,
      });
    }
  }, [competition]);

  useEffect(() => {
    if (failureCount >= 2) {
      router.push("/home");
    }
  }, [failureCount]);

  const backdropVariants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100]
    transition-all duration-500 ease-in-out 
    "
    >
      <motion.div
        key="backdrop"
        initial="hidden"
        animate="visible"
        variants={backdropVariants}
        exit="hidden"
        className="bg-white/80 backdrop-filter backdrop-blur-sm absolute w-full h-full"
        onClick={() => router.push(BACK_LINK)}
      />
      {formattedCompetition ? (
        <motion.div
          key={"modal" + formattedCompetition.id}
          initial="hidden"
          animate="visible"
          variants={modalVariants}
          exit="hidden"
          className="relative bg-white shadow-lg rounded-3xl border
          w-3/4 max-lg:w-11/12 overflow-hidden flex max-sm:flex-col max-h-[80vh]
        "
        >
          <div className="relative w-full max-sm:aspect-video aspect-square overflow-hidden">
            <Image
              src={formattedCompetition.logo.url}
              alt={formattedCompetition.name}
              fill
              sizes="100%"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 px-8 py-8 max-h-full w-full overflow-auto no-scrollbar">
            <div className="flex gap-4 items-center justify-end text-gray-500">
              <a href={formattedCompetition.organizerLink}>
                <User2 className="w-6 h-6 active:scale-90 transition-all hover:text-gray-700" />
              </a>
              <a href={formattedCompetition.googleMapsLink}>
                <MapPin className="w-6 h-6 active:scale-90 transition-all hover:text-gray-700" />
              </a>
              <button
                type="button"
                onClick={() =>
                  router.replace(BACK_LINK, {
                    scroll: false,
                  })
                }
              >
                <X className="w-6 h-6 active:scale-90 transition-all hover:text-gray-700" />
              </button>
            </div>
            <h1 className="text-2xl font-bold">{formattedCompetition.name}</h1>
            <p className="text-gray-700">
              <strong className="text-gray-400 font-semibold uppercase text-xs">
                Beschreibung
              </strong>
              <br />
              {formattedCompetition.description}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-400 font-semibold uppercase text-xs">
                Veranstalter
              </strong>
              <br />
              {formattedCompetition.organizer.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-400 font-semibold uppercase text-xs">
                Location
              </strong>
              <br />
              {formattedCompetition.location.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-400 font-semibold uppercase text-xs">
                Adresse
              </strong>
              <br />
              {formattedCompetition.address}
            </p>
            <p>
              <strong className="text-gray-400 font-semibold uppercase text-xs">
                Datum
              </strong>
              <br />
              {formattedCompetition.date}
            </p>
            <EnrollmentLink
              enrollmentLink={formattedCompetition.enrollmentLink}
            />
          </div>
        </motion.div>
      ) : (
        <Loader2 className="w-12 h-12 text-gray-400/30 animate-spin" />
      )}
    </div>
  );
};

export default CompetitionModal;
