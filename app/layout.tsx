import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceSans = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Sniplnk: URL Shortener',
  description: 'Snip and shorten any link.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}