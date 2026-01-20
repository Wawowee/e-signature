import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://e-signature-nu.vercel.app"),
  title: {
    default: "Signature Studio — Handwritten Signature Practice Worksheets & Generator",
    template: "%s | Signature Studio",
  },
  description:
    "Create a handwritten signature you can actually learn. Generate signature practice worksheets, font samplers, and cut-out sheets. Type or draw your signature, then download or print.",
  openGraph: {
    title: "Signature Studio",
    description:
      "Handwritten signature practice worksheets, font sampler, and cut-out signature sheets. Type or draw, then print or download PDF.",
    url: "https://e-signature-nu.vercel.app",
    siteName: "Signature Studio",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
