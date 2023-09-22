import MainHeader from "@/components/main-header";
import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";
import StaticHeader from "@/components/static-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StaticHeader />
      {children}
      <BottomScrollIndicator />
      <Footer />
    </div>
  );
}
