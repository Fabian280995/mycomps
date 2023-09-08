import MainHeader from "@/components/main-header";
import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader main />
      {children}
      <BottomScrollIndicator />
      <Footer />
    </div>
  );
}
