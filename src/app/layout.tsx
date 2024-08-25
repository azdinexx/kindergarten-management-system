import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kindergarten Mangement System",
  description: "Open Source management system for kindergarten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-black text-neutral-50'}>{children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
