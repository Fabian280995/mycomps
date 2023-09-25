import MainHeader from "@/components/main-header";
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
      <div className="max-w-5xl mx-auto my-12">{children}</div>
      <BottomScrollIndicator />
      <Footer />
    </main>
  );
}
