import type { Metadata } from "next";

import { ToastContainer } from "@/libs/ui/Toast";

import "./globals.css";

export const metadata: Metadata = {
  title: "Productivity Up",
  description: "App to boost your productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className="bg-background text-foreground">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
