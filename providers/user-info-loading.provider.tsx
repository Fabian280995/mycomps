"use client";
import React from "react";
import { useUserInfo } from "./user-info.provider";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const UserInfoLoadingProvider = () => {
  const { isLoading } = useUserInfo();
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 w-full flex flex-col items-center z-50"
        >
          <div className="bg-white border border-gray-200 shadow-md px-6 py-4 rounded-3xl flex items-center max-w-fit">
            <Loader2 className="text-teal-400 animate-spin w-8 h-8" />
            <p className="text-center text-gray-700 text-sm ml-2">
              Bitte warte, bis wir deine Nutzerdaten geladen haben.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default UserInfoLoadingProvider;
