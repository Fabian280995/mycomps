import { currentUser } from "@clerk/nextjs";
import React from "react";

const DashboardSetupPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-12">
      <h1 className="text-4xl font-semibold text-gray-900">
        Hallo {user?.firstName}
      </h1>
    </div>
  );
};

export default DashboardSetupPage;
