import { ArrowRight, Mail, Linkedin, Phone, Sprout, GitMerge } from 'lucide-react';
import { useState } from 'react';
import ContactSection from './components/main_page/ContactSection';
import { PeptideViewer } from './components/main_page/PeptideViewer';
import { DuckweedVideo } from './components/main_page/DuckweedVideo';
import { Analytics } from '@vercel/analytics/react';

const BOOK_URL = 'https://calendar.app.google/waauJ9rnj6JhZmSt9';
const MAIL_URL = 'mailto:mafia@nitroduck.tech';
const LINKEDIN_URL = 'https://www.linkedin.com/company/nitroduck-tech/';

function App() {
  const members = [
    {
      name: 'Matej Zámečník',
      role: 'Co-Founder & CEO',
      img: '/images/team/matej.jpg',
      email: 'matej@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/matejzamecnik/',
    },
    {
      name: 'Matúš Grieš',
      role: 'Head of TechBio',
      img: '/images/team/jonas.jpg',
      email: 'matus@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/mat%C3%BA%C5%A1-grie%C5%A1-45b655202/',
    },
    {
      name: 'Miroslav Rosputinský',
      role: 'Head of SynBio',
      img: '/images/team/miro.jpg',
      email: 'miro@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/miroslav-rosputinsk%C3%BD-23b759307/',
    },
    {
      name: 'Jonáš Pospíchal',
      role: 'Founding Scientist',
      img: '/images/team/matus.jpg',
      email: 'jonas@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/jon%C3%A1%C5%A1-posp%C3%ADchal-b7650a382/',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navButtonClass =
    'group relative px-6 py-2 overflow-hidden rounded-full border border-[#14160F]/30 text-[#14160F] hover:border-[#6CA033] hover:text-[#6CA033] transition-all duration-300';

  const primaryCtaClass =
    'inline-flex items-center gap-2 rounded-full bg-[#6CA033] hover:bg-[#5A8A28] text-white font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5';

  const ghostCtaClass =
    'inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#14160F]/30 hover:border-[#6CA033] hover:text-[#6CA033] text-[#14160F] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5';

  return (
    <div className="min-h-screen bg-white text-[#14160F] break-words font-urbanist">
      {/* Sticky nav */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white/[0.72] backdrop-blur-xl border-b border-[#E6E8DF]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/nitroduck_5.png" alt="NitroDuck logo" className="w-10 h-10" />
            <span className="text-xl font-bold ml-2 mt-1 tracking-tight">NITRODUCK</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo('team')} className={navButtonClass}>
              <span className="relative z-10 flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-sm">
                Team <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${primaryCtaClass} px-6 py-2.5 text-sm`}
            >
              Book a call <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#14160F] p-2 rounded-md hover:bg-black/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 py-4 border-t border-[#E6E8DF]' : 'max-h-0'
          }`}
        >
          <div className="px-6 flex flex-col gap-3">
            <button
              onClick={() => scrollTo('team')}
              className="px-6 py-3 rounded-full border-[1.5px] border-[#14160F]/30 text-[#14160F] font-bold uppercase tracking-[0.12em] text-sm hover:border-[#6CA033] hover:text-[#6CA033] transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              Team <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#6CA033] hover:bg-[#5A8A28] text-white font-bold uppercase tracking-[0.12em] text-sm flex items-center justify-center gap-2"
            >
              Book a call <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-24 md:pt-32 md:pb-28 px-6 bg-white text-[#14160F] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(120% 100% at 0% 0%, rgba(108,160,51,0.20), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-spaceGrotesk tracking-tight leading-[1.04] mt-6 text-balance max-w-5xl">
              Crop protection that <span className="text-[#6CA033]">keeps up with pathogen evolution</span>
            </h1>

            <p className="text-lg md:text-2xl text-[#3A3D34] max-w-3xl leading-relaxed mt-8 font-urbanist">
              We design <b className="text-[#14160F] font-bold">antifungal cyclic peptides with AI</b> and grow them in <b className="text-[#14160F] font-bold">duckweed</b> - bringing
              novel fungicides to market <b className="text-[#14160F] font-bold">faster</b>{' '}
              and <b className="text-[#14160F] font-bold">cheaper</b> than chemicals, and
              stable enough to actually work in the field.
            </p>


            <div className="flex flex-wrap gap-4 mt-11">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${primaryCtaClass} px-8 py-4 text-sm`}
              >
                Book a call <Phone className="w-5 h-5" />
              </a>
              <a href={MAIL_URL} className={`${ghostCtaClass} px-8 py-4 text-sm`}>
                Write to us <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Approach — How it works */}
        <section className="py-24 md:py-28 px-6 bg-[#F4F7EF] border-t border-[#E6E8DF]">
          <div className="max-w-7xl mx-auto">
            
            <h2 className="text-3xl md:text-5xl font-bold font-spaceGrotesk tracking-tight leading-[1.1] text-[#14160F] mt-3 mb-12 max-w-3xl">
              Pharma-grade discovery, <span className="text-[#6CA033]">aimed at the field</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left pillar — AI design (placeholder visual) */}
              <div className="group bg-white border border-[#E6E8DF] rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:border-[#6CA033]">
                <PeptideViewer />
                <div className="px-7 pt-6 pb-8">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-xs text-[#6CA033] font-urbanist">
                    <GitMerge className="w-4 h-4" /> Design
                  </div>
                  <h3 className="text-2xl font-bold font-spaceGrotesk tracking-tight text-[#14160F] mt-3 mb-3">
                    AI-designed cyclic peptides
                  </h3>
                  <p className="text-base leading-relaxed text-[#3A3D34] font-urbanist">
                    Our model designs <b className="text-[#14160F] font-semibold">cyclic peptides</b>                     and cyclization is what keeps them stable in the field. It learns from a fully 
                    <b className="text-[#14160F] font-semibold"> automated field-testing pipeline</b>, so we design and approve new peptides as fast as the
                    pathogens evolve.
                  </p>
                </div>
              </div>

              {/* Right pillar — Grown in duckweed */}
              <div className="group bg-white border border-[#E6E8DF] rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:border-[#6CA033]">
                <div className="h-[230px] border-b border-[#E6E8DF] overflow-hidden">
                  <DuckweedVideo />
                </div>
                <div className="px-7 pt-6 pb-8">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-xs text-[#6CA033] font-urbanist">
                    <Sprout className="w-4 h-4" /> Produce
                  </div>
                  <h3 className="text-2xl font-bold font-spaceGrotesk tracking-tight text-[#14160F] mt-3 mb-3">
                    Grown in duckweed
                  </h3>
                  <p className="text-base leading-relaxed text-[#3A3D34] font-urbanist">
                    We produce cyclic peptides in <b className="text-[#14160F] font-semibold">duckweed </b>
                    - a plant host with the native machinery to cyclize them. It&rsquo;s the only <b className="text-[#14160F] font-semibold">scalable,
                    low-cost route</b> to the stable cyclic peptides chemistry can&rsquo;t make affordably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />

        {/* Team */}
        <section id="team" className="scroll-mt-24 bg-white py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#6B7060] font-urbanist">Sincerely,</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-spaceGrotesk tracking-tight text-[#14160F] mt-3 mb-16">
              Duckweed Mafia
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[18px] bg-white border border-[#E6E8DF] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6CA033]"
                >
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="text-base md:text-lg mt-4 font-bold font-urbanist text-[#14160F]">
                    {member.name}
                  </p>
                  <p className="text-sm text-[#6B7060] font-urbanist">{member.role}</p>
                  <div className="flex flex-row gap-3 mt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#6B7060] hover:text-[#6CA033] transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B7060] hover:text-[#6CA033] transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#E6E8DF] text-[#6B7060] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/images/nitroduck_5.png" alt="NitroDuck logo" className="w-10 h-10" />
              <span className="text-xl font-bold ml-2 mt-1 text-[#14160F] tracking-tight">NITRODUCK</span>
            </div>
            <div className="flex gap-6">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6CA033] transition-colors"
                aria-label="NitroDuck on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={MAIL_URL}
                className="hover:text-[#6CA033] transition-colors"
                aria-label="Email NitroDuck"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#E6E8DF] text-center text-[#6B7060] text-sm">
            <p>&copy; 2026 NitroDuck, Inc. &middot; Antifungal peptides for specialty crops</p>
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
