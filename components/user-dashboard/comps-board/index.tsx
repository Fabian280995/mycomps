"use client";
import CompCardSceleton from "@/components/comps/comp-card-sceleton";
import { useUserInfo } from "@/providers/user-info.provider";
import React from "react";
import CompsList from "./list";

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
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-6">
            <CompCardSceleton />
          </div>
        </div>
      ) : (
        <CompsList compIds={compIds} />
      )}
    </div>
  );
};

export default CompsBoard;
