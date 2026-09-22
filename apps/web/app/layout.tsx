import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "KBS | Operations workspace",
  description: "KBS credit card DSA development foundation",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
