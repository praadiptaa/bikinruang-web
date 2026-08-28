import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bikinruang — Creative Event Production & Fabrication Partner",
  description: "FROM VISION. BUILT UNEXPECTED. Bikinruang transforms event concepts into physical, visual, and spatial experiences through custom fabrication, stage decoration, props, and brand activations.",
  keywords: [
    "Bikinruang",
    "Event Fabrication Malang",
    "Event Fabrication Jawa Timur",
    "Stage Decoration Malang",
    "Event Property",
    "Brand Activation",
    "Custom Backdrop",
    "Event Booth",
    "Party Sets",
    "Spatial Experience"
  ],
  authors: [{ name: "Bikinruang" }],
  openGraph: {
    title: "Bikinruang — Creative Event Production & Fabrication Partner",
    description: "FROM VISION. BUILT UNEXPECTED. Creative ideas transformed into physical spatial experiences.",
    url: "https://bikinruang.co",
    siteName: "Bikinruang",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bikinruang Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-studio-white text-workshop-black min-h-screen flex flex-col font-sans selection:bg-signal-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
