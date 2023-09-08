import { Providers } from "@/lib/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextCommerce: Admin",
  description: "Admin panel for NextCommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={"dark:text-white dark:bg-gray-800 text-black bg-slate-200"}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
