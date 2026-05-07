import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, Globe } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-[#0F0F1A] text-gray-400">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="md:col-span-6 lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/CreativeAc-New.png"
                alt="Creativemu Academy Logo"
                width={160}
                height={40}
                className="h-8 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Platform pelatihan teknologi terpercaya dengan fokus pada kesiapan industri dan sertifikasi profesional.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-6">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-violet-400 transition-colors">
                <div className="size-8 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
                  <Facebook size={18} className="text-white" fill="currentColor" strokeWidth={0} />
                </div>
                <span className="text-sm font-medium">@creativemu_academy</span>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-violet-400 transition-colors">
                <div className="size-8 rounded-full bg-black flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.26 6.36 6.33 6.33 0 006.33-6.26v-6.3a8.16 8.16 0 004.28 1.15V7.07a4.93 4.93 0 01-2.28-.38z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">@creativemu_academy</span>
              </a>
              <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-violet-400 transition-colors">
                <div className="size-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">www.creativemuacademy.com</span>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-violet-400 transition-colors">
                <div className="size-8 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">@creativemu_academy</span>
              </a>
            </div>
          </div>

          {/* Program links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-white font-semibold mb-5">Program</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "#features", label: "Keunggulan" },
                { href: "#roadmap", label: "Kurikulum" },
                { href: "#pricing", label: "Program" },
                { href: "/daftar", label: "Daftar Sekarang" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-violet-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-white font-semibold mb-5">Kontak</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-violet-400 shrink-0" />
                <span>admin_official@creativemuacademy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-violet-400 shrink-0" />
                <a href="https://wa.me/6285177114036" className="hover:text-violet-400 transition-colors">
                  +62 851-7711-4036
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-violet-400 shrink-0 mt-0.5" />
                <span>Bantul, Yogyakarta</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2026 Creativemu Academy. All rights reserved.</span>
          <span className="text-white/30">Platform Pelatihan Digital Marketing</span>
        </div>
      </div>
    </footer>
  );
}
