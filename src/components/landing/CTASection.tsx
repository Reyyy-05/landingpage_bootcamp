"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Bootcamp } from "@/types";
import { formatDate } from "@/lib/utils";

const TESTIMONIAL = {
  name: "Siti Rahma",
  role: "Alumni Batch 10 · Digital Marketing Specialist",
  quote:
    '"Sertifikasi BNSP dari program ini benar-benar membuka pintu karir saya. Kurikulumnya sangat daging dan mentornya luar biasa."',
};

export function CTASection() {
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("bootcamps")
      .select("*")
      .eq("is_active", true)
      .eq("is_open", true)
      .order("batch_number", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => data && setBootcamp(data));
  }, []);

  return (
    <section id="cta" className="py-24 landing-bg">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-violet-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Info */}
            <div className="bg-violet-700 p-10 text-white flex flex-col justify-between">
              <div>
                <h2
                  className="text-3xl font-bold leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Amankan Kursi Anda Sekarang.
                </h2>
                {bootcamp && (
                  <p className="text-violet-200 text-sm mb-8">
                    Batch {bootcamp.batch_number} akan segera dimulai. Jangan
                    lewatkan kesempatan untuk bertransformasi menjadi digital
                    marketer tersertifikasi.
                  </p>
                )}

                {/* Batch details */}
                {bootcamp && (
                  <div className="flex flex-col gap-3 mb-8">
                    {bootcamp.start_date && (
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Calendar size={15} />
                        </div>
                        <div>
                          <p className="text-xs text-violet-300 uppercase tracking-wider">
                            Mulai Kelas
                          </p>
                          <p className="font-semibold text-sm">
                            {formatDate(bootcamp.start_date)}
                          </p>
                        </div>
                      </div>
                    )}
                    {bootcamp.location && (
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <MapPin size={15} />
                        </div>
                        <div>
                          <p className="text-xs text-violet-300 uppercase tracking-wider">
                            Lokasi
                          </p>
                          <p className="font-semibold text-sm">
                            {bootcamp.location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Testimonial */}
              <div className="bg-white/10 rounded-2xl p-5 mt-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-full bg-violet-400 flex items-center justify-center text-white font-bold shrink-0">
                    SR
                  </div>
                  <div>
                    <p className="text-sm text-white font-semibold">
                      {TESTIMONIAL.name}
                    </p>
                    <p className="text-xs text-violet-300 mb-2">
                      {TESTIMONIAL.role}
                    </p>
                    <p className="text-sm text-violet-100 leading-relaxed italic">
                      {TESTIMONIAL.quote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Simple CTA form */}
            <div className="p-10 flex flex-col justify-center">
              <h3
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Formulir Pendaftaran
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Isi formulir lengkap dan konfirmasi via WhatsApp Admin.
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  href="/daftar"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-all hover:shadow-lg"
                >
                  Isi Formulir Pendaftaran
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="https://wa.me/6285177114036?text=Halo+Admin%2C+saya+ingin+bertanya+tentang+program+Creativemu+Academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border-2 border-green-500 text-green-700 font-semibold hover:bg-green-50 transition-all"
                >
                  💬 Chat via WhatsApp
                </a>
              </div>

              <p className="text-xs text-gray-400 text-center mt-5">
                Data kamu aman dan tidak akan disebarkan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
