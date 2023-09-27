import { Providers } from "@/lib/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { StateProvider } from "@/context/state";

export const metadata: Metadata = {
  title: "NextCommerce: Register",
  description: "Authentication for NextCommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          <Toaster />
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
