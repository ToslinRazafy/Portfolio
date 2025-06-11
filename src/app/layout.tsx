import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RAZAFITSOTRA Toslin - Portfolio",
  description:
    "Portfolio professionnel de RAZAFITSOTRA Toslin présentant mes compétences et projets en développement web avec React, Next.js, Laravel et plus encore.",
  keywords: [
    "développeur web",
    "portfolio",
    "React",
    "Next.js",
    "Toslin Razafitsotra",
    "développement",
    "projets",
  ],
  authors: [{ name: "RAZAFITSOTRA Toslin" }],
  openGraph: {
    title: "RAZAFITSOTRA Toslin - Portfolio",
    description:
      "Découvrez mes projets et compétences en développement web - React, Next.js, Laravel, et plus encore.",
    url: "https://toslin-five.vercel.app",
    siteName: "Portfolio de RAZAFITSOTRA Toslin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} antialiased font-sans transition-colors duration-300 min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
