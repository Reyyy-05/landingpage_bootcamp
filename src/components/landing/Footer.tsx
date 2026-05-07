import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-[#0F0F1A] text-gray-400">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-creativemu.png"
                alt="Creativemu Academy Logo"
                width={160}
                height={40}
                className="h-8 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Platform pelatihan teknologi terpercaya dengan fokus pada kesiapan industri dan sertifikasi profesional.
            </p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                className="size-9 rounded-full bg-white/5 hover:bg-violet-600 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
                className="size-9 rounded-full bg-white/5 hover:bg-violet-600 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                className="size-9 rounded-full bg-white/5 hover:bg-violet-600 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Program links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Program</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "#features", label: "Keunggulan" },
                { href: "#roadmap", label: "Kurikulum" },
                { href: "#pricing", label: "Harga & Paket" },
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
          <div>
            <h3 className="text-white font-semibold mb-5">Kontak</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-violet-400 shrink-0" />
                <span>info@creativemu.id</span>
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
