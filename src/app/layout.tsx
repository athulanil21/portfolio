import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Athul Anil Kumar — AI Engineer | Portfolio",
  description:
    "AI Engineer crafting intelligent systems and immersive digital experiences. Specializing in LLM engineering, agentic systems, and full-stack development.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "LLM Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Athul Anil Kumar",
  ],
  authors: [{ name: "Athul Anil Kumar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Athul Anil Kumar — AI Engineer",
    description:
      "AI Engineer crafting intelligent systems and immersive digital experiences.",
    siteName: "Athul Anil Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athul Anil Kumar — AI Engineer",
    description:
      "AI Engineer crafting intelligent systems and immersive digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="noise-overlay min-h-screen" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </body>
    </html>
  );
}
