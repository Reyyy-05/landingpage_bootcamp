import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Creativemu Academy | Batch 1 Laravel Web Developer",
    template: "%s | Creativemu Academy",
  },
  description:
    "Ayo gabung di Batch 1 Laravel Web Developer 3 Bulan. Biaya investasi hanya Rp 1.000.000 saja! Kuota terbatas.",
  keywords: [
    "bootcamp laravel",
    "fullstack developer",
    "sertifikasi BNSP",
    "belajar coding jogja",
    "creativemu academy",
    "digital marketing",
    "batch 1 laravel",
    "promo juni",
  ],
  authors: [{ name: "Creativemu Academy" }],
  creator: "Creativemu Academy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://landingpagebootcamp-omega.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landingpagebootcamp-omega.vercel.app",
    siteName: "Creativemu Academy",
    title: "Creativemu Academy | Batch 1 Laravel Web Developer",
    description:
      "Kini hanya Rp 1.000.000 untuk kelas akselerasi Laravel Web Developer 3 Bulan!",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Logo Creativemu Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativemu Academy | Batch 1 Laravel Web Developer",
    description:
      "Kini hanya Rp 1.000.000 untuk kelas akselerasi Laravel Web Developer 3 Bulan!",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
    <html lang="id" className={`${syne.variable} ${plusJakartaSans.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
