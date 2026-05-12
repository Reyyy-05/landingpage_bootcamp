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
    default: "Creativemu Academy – Jadi Full-Stack Laravel Developer dalam 6 Bulan",
    template: "%s | Creativemu Academy",
  },
  description:
    "Bootcamp IT intensif dengan sertifikasi resmi BNSP. Belajar langsung dari praktisi industri, bangun portofolio nyata, dan dapatkan koneksi kerja selamanya.",
  keywords: [
    "bootcamp laravel",
    "fullstack developer",
    "sertifikasi BNSP",
    "belajar coding jogja",
    "creativemu academy",
    "digital marketing",
  ],
  authors: [{ name: "Creativemu Academy" }],
  creator: "Creativemu Academy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://creativemuacademy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Creativemu Academy",
    title: "Creativemu Academy – Jadi Full-Stack Laravel Developer dalam 6 Bulan",
    description:
      "Bootcamp IT intensif dengan sertifikasi resmi BNSP. Belajar langsung dari praktisi industri, bangun portofolio nyata, dan siap kerja dalam 6 bulan.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Creativemu Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativemu Academy – Jadi Full-Stack Laravel Developer dalam 6 Bulan",
    description:
      "Bootcamp IT intensif dengan sertifikasi resmi BNSP. Belajar langsung dari praktisi industri dan siap kerja.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
