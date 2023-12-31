import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";
import MainHeader from "@/components/main-header";
import UserInfoProvider from "@/providers/user-info.provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainHeader />
      {children}
      <BottomScrollIndicator />
      <Footer />
    </main>
  );
}
