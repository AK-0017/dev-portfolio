import type { Metadata } from "next";
import { Inter, Bebas_Neue, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atharva Kulkarni | Developer · Founder · Builder",
  description: "Portfolio of Atharva Kulkarni - A Mumbai-based software developer, founder, and builder of autonomous systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${firaCode.variable} antialiased`}
    >
      <body className="bg-black text-[#f8f8f8] selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
