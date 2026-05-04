import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
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
    default: "Creativemu Academy — Bootcamp Digital Marketing Bersertifikat BNSP",
    template: "%s | Creativemu Academy",
  },
  description:
    "Bootcamp Digital Marketing intensif bersertifikat BNSP di Yogyakarta. Belajar dari mentor praktisi industri, kerjakan proyek nyata, dan siap berkarir dalam 6 bulan.",
  keywords: [
    "bootcamp digital marketing",
    "sertifikasi BNSP",
    "pelatihan digital marketing yogyakarta",
    "creativemu academy",
    "belajar digital marketing",
  ],
  authors: [{ name: "Creativemu Academy" }],
  creator: "Creativemu Academy",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Creativemu Academy",
    title: "Creativemu Academy — Bootcamp Digital Marketing Bersertifikat BNSP",
    description:
      "Bootcamp Digital Marketing intensif bersertifikat BNSP di Yogyakarta. Belajar dari mentor praktisi, kerjakan proyek nyata, siap karir dalam 6 bulan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativemu Academy — Bootcamp Digital Marketing Bersertifikat BNSP",
    description:
      "Bootcamp Digital Marketing intensif bersertifikat BNSP di Yogyakarta.",
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
      </body>
    </html>
  );
}
