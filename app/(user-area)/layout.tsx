import BottomScrollIndicator from "@/components/bottom-scroll-indicator";

export default function UserAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      {children}
      <BottomScrollIndicator />
    </main>
  );
}
