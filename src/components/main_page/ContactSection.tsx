'use client';
import { Mail, Phone } from 'lucide-react';

const BOOK_URL = 'https://calendar.app.google/waauJ9rnj6JhZmSt9';
const MAIL_URL = 'mailto:mafia@nitroduck.tech';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 md:py-32 px-6 bg-[#F4F7EF] text-[#14160F] border-t border-b border-[#E6E8DF]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold font-spaceGrotesk leading-[1.05] tracking-tight">
          We&rsquo;re early - and that&rsquo;s <span className="text-[#6CA033]">your advantage.</span>
        </h2>

        <p className="text-xl md:text-2xl mt-10 leading-relaxed text-[#3A3D34] font-urbanist max-w-2xl mx-auto">
          Tell us what pathogens do you struggle with and we&rsquo;re here to build a solution for you. 
        </p>

        <p className="text-2xl md:text-3xl font-semibold mt-8 text-[#6CA033] font-spaceGrotesk">
          The faster it evolves, the more you need us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-14">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6CA033] hover:bg-[#5A8A28] text-white font-bold uppercase tracking-[0.12em] text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a call <Phone className="w-4 h-4" />
          </a>
          <a
            href={MAIL_URL}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-[1.5px] border-[#14160F]/30 hover:border-[#6CA033] hover:text-[#6CA033] text-[#14160F] font-bold uppercase tracking-[0.12em] text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Write to us <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
