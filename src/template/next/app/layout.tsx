import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TN App",
  description: "Generate with TN App ",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased ">{children}</body>
    </html>
  );
}
