import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio 7 Miami",
  description: "Photography, video, podcast production and studio rentals in Miami.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
