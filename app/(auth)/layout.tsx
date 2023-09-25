import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import Footer from "@/components/footer";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen overflow-hidden padding-x flex items-center justify-center">
      {children}
    </main>
  );
}
