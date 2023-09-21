import { TanstackProvider } from "@/providers/query-client.provider";
import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
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
      <body className={`${lato.className} no-scrollbar`}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
