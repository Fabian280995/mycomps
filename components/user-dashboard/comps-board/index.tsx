"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import React from "react";
import CompsList from "./list";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CompsBoard = () => {
  const [compIds, setCompIds] = React.useState<string[]>([]);
  const { userInfo, isLoading } = useUserInfo();

  React.useEffect(() => {
    if (userInfo) {
      setCompIds(userInfo.compIds);
    }
  }, [userInfo]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeOut",
            duration: 0.2,
          }}
          className="flex flex-col items-center justify-center w-full min-h-[60vh]"
        >
          <Loader2 className="text-gray-400/40 animate-spin w-12 h-12" />
          <p className="text-gray-400 font-semibold">
            Wir laden deine Nutzer-Informationen...
          </p>
        </motion.div>
      ) : compIds.length ? (
        <CompsList compIds={compIds} />
      ) : null}
    </AnimatePresence>
  );
};

export default CompsBoard;
