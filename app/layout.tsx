import { TanstackProvider } from "@/providers/query-client.provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2dd4bf",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} no-scrollbar`}>
          <TanstackProvider>{children}</TanstackProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
