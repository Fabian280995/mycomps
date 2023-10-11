import Sidebar from "@/components/user-dashboard/sidebar";
import UserInfoProvider from "@/providers/user-info.provider";

export default async function UserAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserInfoProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
        <div className="flex-1 w-full h-full overflow-y-auto bg-gray-50 padding-x py-6 sm:py-8 lg:py-10 xl:py-12">
          {children}
        </div>
      </main>
    </UserInfoProvider>
  );
}
