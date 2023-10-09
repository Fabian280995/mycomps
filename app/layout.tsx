import { TanstackProvider } from "@/providers/query-client.provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#2dd4bf",
          },
        }}
      >
        <body className={`${inter.className} no-scrollbar`}>
          <TanstackProvider>{children}</TanstackProvider>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
