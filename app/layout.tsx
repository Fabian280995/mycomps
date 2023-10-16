import { TanstackProvider } from "@/providers/query-client.provider";
import "./globals.css";
import { Baloo_Paaji_2, Inter, Onest, Raleway } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import MapLinkProvider from "@/providers/map-link.provider";
import UserInfoProvider from "@/providers/user-info.provider";

const font = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mycomps",
  description: "mycomps - created by fabian lessmann",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#2dd4bf",
          },
        }}
      >
        <body className={`${font.className} no-scrollbar`}>
          <TanstackProvider>
            <UserInfoProvider>{children}</UserInfoProvider>
            <MapLinkProvider />
          </TanstackProvider>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
