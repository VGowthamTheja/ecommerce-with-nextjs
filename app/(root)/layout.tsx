import { Providers } from "@/lib/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextCommerce",
  description: "An E-Commerce platform built with Next.js and NextUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Topbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
