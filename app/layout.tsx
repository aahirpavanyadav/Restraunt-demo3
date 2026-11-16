import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurelia-mayfair.example.com";

const title = "Aurelia — Modern European dining in Mayfair, London";
const description =
  "Seasonal European cooking over open fire, grower-led wine and a warm welcome in the heart of Mayfair. Explore the menu and request your table.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Aurelia",
  keywords: [
    "restaurant Mayfair",
    "Modern European restaurant London",
    "fine dining Mayfair",
    "seasonal restaurant",
    "open fire cooking",
    "Aurelia restaurant",
  ],
  authors: [{ name: "Aurelia" }],
  creator: "Aurelia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Aurelia",
    title,
    description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1067,
        alt: "A warm candlelit table at Aurelia in Mayfair",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#131110" },
  ],
};

const themeScript = `(function(){try{var k='aurelia-theme',s=localStorage.getItem(k),m=window.matchMedia('(prefers-color-scheme: dark)').matches,t=(s==='dark'||s==='light')?s:(m?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.classList.add('js');}catch(e){document.documentElement.classList.add('js');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
