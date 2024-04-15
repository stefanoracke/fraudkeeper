import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/src/providers/Provider";
import NavbarFK from "@/src/components/NavarFK";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fraudkeeper prueba técnica",
  description: "Mostrar JSON en tabla luego transformar de la misma manera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavbarFK></NavbarFK>
          {children}
        </Provider>
      </body>
    </html>
  );
}
