import UserInfoProvider from "@/providers/user-info.provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserInfoProvider>
      <div className="padding-x py-12">{children}</div>
    </UserInfoProvider>
  );
}
