"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Keunggulan" },
  { href: "#roadmap", label: "Kurikulum" },
  { href: "#pricing", label: "Harga" },
  { href: "#cta", label: "Daftar" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-violet-100"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-800 text-xl text-violet-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Creativemu Academy
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-violet-700 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/daftar"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-violet-700 text-white hover:bg-violet-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Daftar Sekarang
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-violet-100 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-gray-700 py-2"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/daftar"
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-violet-700 text-white text-center"
            onClick={() => setMobileOpen(false)}
          >
            Daftar Sekarang
          </Link>
        </div>
      )}
    </header>
  );
}
