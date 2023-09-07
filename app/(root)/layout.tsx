import type { Metadata } from "next";

import "../globals.css";
import { Navbar } from "../../components";
import Provider from "../../lib/Provider";

export const metadata: Metadata = {
  title: "Ecommerce-NextJS",
  description: "An Ecommerce website built with NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
