import Sidebar from "@/components/user-dashboard/sidebar";
import CompetitionModalProvider from "@/providers/competition-modal.provider";
import UserInfoLoadingProvider from "@/providers/user-info-loading.provider";
import UserInfoProvider from "@/providers/user-info.provider";
import { User } from "lucide-react";

export default async function UserAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserInfoLoadingProvider />
      <main className="w-full h-screen flex">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
