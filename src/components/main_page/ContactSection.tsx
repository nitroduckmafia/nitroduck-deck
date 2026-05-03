'use client';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 bg-gradient-to-b from-[#08110A] to-black text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold font-spaceGrotesk leading-[1.05]">
          We&rsquo;re early &mdash; and that&rsquo;s <span className="text-green-400">your advantage.</span>
        </h2>

        <p className="text-xl md:text-2xl mt-10 leading-relaxed text-white/70 font-urbanist">
          We&rsquo;re offering a few custom pilots: for a fraction of the cost, we&rsquo;ll personally tailor hydroxylated analogs of your most complex substrates.
        </p>

        <p className="text-2xl md:text-3xl font-semibold mt-8 text-green-400 font-spaceGrotesk">
          The tougher the molecule, the better.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-14">
          <a
            href="https://calendar.app.google/waauJ9rnj6JhZmSt9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-400 hover:bg-green-300 text-black font-bold uppercase tracking-[0.12em] text-sm shadow-nd-cta transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a call <Phone className="w-4 h-4" />
          </a>
          <a
            href="mailto:mafia@nitroduck.tech"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 hover:border-green-400 hover:text-green-400 text-white font-bold uppercase tracking-[0.12em] text-sm transition-all duration-200"
          >
            Write to us <Mail className="w-4 h-4" />
          </a>
        </div>

        
      </div>
    </section>
  );
}
