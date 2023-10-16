import MainHeader from "@/components/main-header";
import UserInfoProvider from "@/providers/user-info.provider";
import { LoadScriptNext } from "@react-google-maps/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col">
      <MainHeader />
      {children}
    </main>
  );
}
