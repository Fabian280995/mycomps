"use client";
import CompetitionModal from "@/components/comps/comp-modal";
import { AnimatePresence } from "framer-motion";
import React from "react";

const CompetitionModalProvider = ({
  competition_id,
}: {
  competition_id: string | undefined;
}) => {
  return (
    <AnimatePresence mode="wait">
      {competition_id ? <CompetitionModal compId={competition_id} /> : null}
    </AnimatePresence>
  );
};

export default CompetitionModalProvider;
