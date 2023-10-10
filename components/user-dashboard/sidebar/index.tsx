import Brand from "@/components/main-header/brand";
import getUserInfo from "@/lib/actions/getUserInfo";
import { SignOutButton, UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import CompsNav from "./comps-nav";

const Sidebar = async () => {
  const user = auth();
  if (!user) redirect("/");

  const token = await user.getToken();
  if (!token) redirect("/");
  const userInfo = await getUserInfo(token);
  return (
    <div className="w-64 h-full bg-white flex flex-col px-6 py-6 gap-10 border-r justify-between">
      <div className="flex flex-col gap-8">
        <Brand />
        <div className="w-full flex flex-col items-center justify-center">
          <div className="h-6">
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="text-gray-700 text-sm mt-2 font-semibold">
            {userInfo.firstName && userInfo.lastName
              ? userInfo.firstName + " " + userInfo.lastName
              : userInfo.email}
          </p>
        </div>
        <div className="flex items-start w-full flex-col">
          <h4 className="text-gray-400 text-lg font-semibold">
            Deine Wettkämpfe
          </h4>
          <CompsNav compIds={userInfo.compIds} />
        </div>
      </div>
      <SignOutButton>
        <button className="w-full h-12 bg-teal-400 text-white rounded-3xl">
          Abmelden
        </button>
      </SignOutButton>
    </div>
  );
};

export default Sidebar;
