import MainHeader from "@/components/main-header";
import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainHeader main={false} />
      {children}
      <BottomScrollIndicator />
      <Footer />
    </main>
  );
}
