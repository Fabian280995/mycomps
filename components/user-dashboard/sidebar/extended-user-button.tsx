"use client";
import { cn } from "@/lib/utils";
import { useUserInfo } from "@/providers/user-info.provider";
import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const ExtendedUserButton = () => {
  const { userInfo, isLoading } = useUserInfo();
  return !isLoading ? (
    <motion.div
      key="user-button"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2,
        ease: "easeIn",
      }}
      className={cn(
        "group flex items-center rounded-full border transform-gpu transition-all bg-white shadow-md border-gray-200",
        "hover:bg-gray-100 h-12 cursor-pointer"
      )}
    >
      {userInfo ? (
        <p className="mx-4 font-semibold text-gray-700 group-hover:text-gray-900 transition-all">
          {userInfo.firstName + " " + userInfo.lastName}
        </p>
      ) : null}
      <div className="h-12 w-12 flex items-center justify-center rounded-full">
        <ClerkLoading>
          <Loader2 className="text-gray-400/40 animate-spin w-full h-full m-3" />
        </ClerkLoading>
        <UserButton afterSignOutUrl="/" />
      </div>
    </motion.div>
  ) : null;
};

export default ExtendedUserButton;
