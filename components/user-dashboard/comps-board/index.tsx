"use client";
import { useUserInfo } from "@/providers/user-info.provider";
import React from "react";
import CompsList from "./list";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CompCardSceleton from "@/components/comps/comp-card-sceleton";

const CompsBoard = () => {
  const [compIds, setCompIds] = React.useState<string[]>([]);
  const { userInfo } = useUserInfo();

  React.useEffect(() => {
    if (userInfo) {
      setCompIds(userInfo.compIds);
    }
  }, [userInfo]);

  return (
    <div className="">
      {compIds.length === 0 ? (
        <div className="mt-6">
          <CompCardSceleton />
        </div>
      ) : (
        <CompsList compIds={compIds} />
      )}
    </div>
  );
};

export default CompsBoard;
