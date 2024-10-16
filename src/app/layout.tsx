import type { Metadata } from "next";

import "./globals.css";
import { poppins } from "@app/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: 'Shortlinkv2',
    template: 'Shortlinkv2 - %s',
  },
  description: "Site para gerenciar links curtos da API Shorter-v2, utilizado pela COPPETEC",
  authors: [{ name: "Daniel Pelajo" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body
        className={`${poppins.className} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
