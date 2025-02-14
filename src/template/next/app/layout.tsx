import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOA stack",
  description: "Generate with NOA stack ",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
