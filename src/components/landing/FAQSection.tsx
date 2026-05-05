"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "Apakah kelas ini cocok untuk pemula yang belum pernah belajar IT?",
    answer:
      "Tentu saja! Kurikulum kami dirancang dari nol (basic) hingga tahap mahir (advanced). Mentor kami akan mendampingi proses belajarmu setahap demi setahap, jadi kamu tidak perlu khawatir tertinggal meskipun tidak punya background IT.",
  },
  {
    question: "Berapa lama durasi program bootcamp ini?",
    answer:
      "Program ini berlangsung secara intensif selama 6 bulan. Di bulan-bulan terakhir, kamu akan difokuskan pada pembuatan portfolio riil dan persiapan ujian sertifikasi BNSP.",
  },
  {
    question: "Apakah ada jaminan mendapat pekerjaan setelah lulus?",
    answer:
      "Kami memiliki program Career Support dan bekerja sama dengan puluhan Hiring Partner. Lulusan terbaik kami akan langsung disalurkan. Namun, hasil akhir tetap bergantung pada dedikasi dan kualitas portfoliomu selama belajar.",
  },
  {
    question: "Bagaimana sistem pembelajarannya? Online atau Offline?",
    answer:
      "Kami menyediakan sistem hybrid. Kamu bisa memilih untuk mengikuti sesi secara offline di studio kami di Yogyakarta, atau mengikuti live session secara online dari mana saja dengan kualitas interaksi yang sama baiknya.",
  },
  {
    question: "Apakah pasti lulus ujian Sertifikasi BNSP?",
    answer:
      "Tim instruktur kami adalah praktisi berlisensi yang telah memetakan kurikulum bootcamp agar 100% selaras dengan standar kompetensi BNSP. Selama kamu mengikuti kelas dengan baik dan menyelesaikan tugas, peluang lulus ujian sangatlah besar.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="faq">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
            <MessageCircleQuestion size={16} className="text-violet-600" />
            <span className="text-sm font-semibold text-slate-700">
              Pertanyaan Umum
            </span>
          </div>
          
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Masih Ragu Bergabung? <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Temukan Jawabannya di Sini
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Berikut adalah beberapa pertanyaan yang paling sering diajukan oleh calon peserta bootcamp kami.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b-slate-100 last:border-0"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-800 hover:text-violet-700 hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Banner inside FAQ */}
        <div className="mt-12 bg-violet-600 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Punya Pertanyaan Spesifik Lainnya?
            </h3>
            <p className="text-violet-100 mb-8 max-w-xl mx-auto">
              Tim konsultan pendidikan kami siap membantu menjawab segala pertanyaan terkait program, pembiayaan, dan prospek karirmu.
            </p>
            <a
              href="https://wa.me/6285177114036?text=Halo+Admin+Creativemu+Academy%2C+saya+ingin+bertanya+lebih+lanjut+tentang+bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-violet-700 font-bold hover:bg-violet-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Chat via WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
