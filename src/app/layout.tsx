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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://atharvakulkarni.in"),
  title: {
    default: "Atharva Kulkarni | Software Developer · Founder · Visionary",
    template: "%s | Atharva Kulkarni"
  },
  description: "Official Portfolio of Atharva Kulkarni - A high-performance software developer and founder building the next generation of cinematic digital experiences and autonomous systems.",
  keywords: [
    "Atharva Kulkarni", 
    "Atharva Kulkarni Software", 
    "Atharva Kulkarni Developer", 
    "Atharva Kulkarni Founder", 
    "Atharva Kulkarni Portfolio", 
    "Atharva Kulkarni Mumbai",
    "atharvakulkarni.in",
    "ak-0017",
    "Software Developer", 
    "Full Stack Developer", 
    "Cinematic Web Design",
    "Autonomous Systems"
  ],
  authors: [{ name: "Atharva Kulkarni" }],
  creator: "Atharva Kulkarni",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Atharva Kulkarni Studio OS",
    title: "Atharva Kulkarni | Cinematic Engineering & Digital Architecture",
    description: "Architecting the future of high-fidelity digital experiences. Explore the portfolio of Atharva Kulkarni.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atharva Kulkarni | Portfolio",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Kulkarni | Software Developer & Founder",
    description: "Building at the intersection of cinematic design and robust engineering.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Atharva Kulkarni",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "jobTitle": "Software Developer",
    "description": "Software developer and founder focused on high-fidelity web experiences and autonomous systems.",
    "sameAs": [
      "https://github.com/ak-0017",
      "https://instagram.com/ak_mere_khwab",
      "https://linkedin.com/in/atharva-kulkarni-1087b4333"
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${firaCode.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-[#f8f8f8] selection:bg-[#FFB800] selection:text-black">
        {children}
      </body>
    </html>
  );
}
