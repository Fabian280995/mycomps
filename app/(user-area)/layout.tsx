import BottomScrollIndicator from "@/components/bottom-scroll-indicator";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/home");
  }

  return (
    <main className="w-full">
      {children}
      <BottomScrollIndicator />
    </main>
  );
}
