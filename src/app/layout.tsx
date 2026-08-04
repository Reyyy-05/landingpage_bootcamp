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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://laravel.creativemuacademy.com";

export const metadata: Metadata = {
  title: {
    default: "Bootcamp Laravel Web Developer | Creativemu Academy",
    template: "%s | Creativemu Academy",
  },
  description:
    "Promo Kemerdekaan RI Ke-81: Cukup Bayar 81%! Program Akselerasi 3 Bulan Siap Kerja dengan 3 Proyek Portfolio Real Production-Grade.",
  keywords: [
    "bootcamp laravel",
    "fullstack developer",
    "portfolio developer",
    "belajar coding jogja",
    "creativemu academy",
    "batch 1 laravel",
    "promo kemerdekaan",
    "hut ri ke 81",
  ],
  authors: [{ name: "Creativemu Academy" }],
  creator: "Creativemu Academy",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Creativemu Academy",
    title: "Bootcamp Laravel Web Developer | Creativemu Academy",
    description:
      "Promo Kemerdekaan RI Ke-81: Cukup Bayar 81%! Program Akselerasi 3 Bulan Siap Kerja dengan 3 Proyek Portfolio Real Production-Grade.",
    images: [
      {
        url: `${siteUrl}/images/og-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Creativemu Academy - Bootcamp Laravel Web Developer Promo Kemerdekaan",
        type: "image/jpeg",
      },
      {
        url: `${siteUrl}/images/og-square.jpg`,
        width: 1080,
        height: 1080,
        alt: "Promo HUT RI Ke-81 Bootcamp Laravel Web Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bootcamp Laravel Web Developer | Creativemu Academy",
    description:
      "Promo Kemerdekaan RI Ke-81: Cukup Bayar 81%! Program Akselerasi 3 Bulan Siap Kerja dengan 3 Proyek Portfolio Real Production-Grade.",
    images: [`${siteUrl}/images/og-banner.jpg`],
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
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
