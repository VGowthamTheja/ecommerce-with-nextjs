import { Providers } from "@/lib/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/Navbar";
import SideNavMenu from "@/components/SideNavMenu";
import { Toaster } from "react-hot-toast";

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
      <body className="dark:bg-slate-500 h-screen">
        <Providers>
          <Toaster />
          <Topbar />
          <SideNavMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
