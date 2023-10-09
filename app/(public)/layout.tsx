import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";
import MainHeader from "@/components/main-header";

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
