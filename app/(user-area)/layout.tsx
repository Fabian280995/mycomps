import Sidebar from "@/components/user-dashboard/sidebar";
import getUserInfo from "@/lib/actions/getUserInfo";
import UserInfoProvider from "@/providers/user-info.provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function UserAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserInfoProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
        <div className="flex-1 w-full h-full overflow-y-auto">{children}</div>
      </main>
    </UserInfoProvider>
  );
}
