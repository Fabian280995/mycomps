import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";
import StaticHeader from "@/components/static-header";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <StaticHeader />
      {children}
      <BottomScrollIndicator />
      <Footer />
    </main>
  );
}
