import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { useState } from 'react';
import ContactSection from './components/main_page/ContactSection';
import { Analytics } from '@vercel/analytics/react';

const NITROCAT_URL = 'https://nitrocat.tech';

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
      img: '/images/team/matus.jpg',
      email: 'matus@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/mat%C3%BA%C5%A1-grie%C5%A1-45b655202/',
    },
    {
      name: 'Miroslav Rosputinsky',
      role: 'Head of SynBio',
      img: '/images/team/miro.jpg',
      email: 'miro@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/miroslav-rosputinsk%C3%BD-23b759307/',
    },
    {
      name: 'Pravoslav Žilka',
      role: 'Founding Engineer',
      img: '/images/team/pravoslav.jpg',
      email: 'pravoslav@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/pravoslav-zilka/',
    },
    {
      name: 'Jonáš Pospíchal',
      role: 'Founding Scientist',
      img: '/images/team/jonas.jpg',
      email: 'jonas@nitroduck.tech',
      linkedin: 'https://www.linkedin.com/in/jon%C3%A1%C5%A1-posp%C3%ADchal-b7650a382/',
    },
  ];

  const cards = [
    {
      img: '/images/p450_pic.png',
      alt: 'Cytochrome P450 enzyme illustration',
      text: (
        <>
          Powered by <span className="font-semibold text-white">cytochromes   P450 </span>, the best enzymes functionalization of complex molecules.
        </>
      ),
    },
    {
      img: '/images/paclitaxel.png',
      alt: 'Paclitaxel molecule',
      text: (
        <>
          Focused on <span className="font-semibold text-white">plant P450s</span>, that underpin 10% of all approved drugs and created the first cancer blockbuster, <span className="italic">Paclitaxel</span>.
        </>
      ),
    },
    {
      img: '/images/Picture3.png',
      alt: 'Duckweed plant',
      text: (
        <>
          None are commercially available. <span className="font-semibold text-white">NitroDuck</span> produces them thanks to our iGEM Grand Prize-winning plant recombinant technology.
        </>
      ),
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navButtonClass =
    'group relative px-6 py-2 overflow-hidden rounded-full border border-white/30 text-white hover:border-green-400 transition-all duration-300';

  const navButtonHoverFill =
    'absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center';

  return (
    <div className="min-h-screen bg-black text-white break-words font-urbanist">
      {/* Sticky nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/nitroduck_5.png" alt="NitroDuck logo" className="w-10 h-10" />
            <span className="text-xl font-bold ml-2 mt-1 tracking-tight">NITRODUCK</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={NITROCAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-2 overflow-hidden rounded-full bg-green-400 text-black hover:bg-green-300 transition-all duration-300 shadow-nd-cta"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-sm">
                NitroCat <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <button onClick={() => scrollTo('team')} className={navButtonClass}>
              <span className="relative z-10 flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-sm transition-colors duration-300">
                Team <ArrowRight className="w-4 h-4" />
              </span>
              <div className={navButtonHoverFill}></div>
            </button>

            <button onClick={() => scrollTo('contact')} className={navButtonClass}>
              <span className="relative z-10 flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-sm transition-colors duration-300">
                Get in touch <ArrowRight className="w-4 h-4" />
              </span>
              <div className={navButtonHoverFill}></div>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-md hover:bg-white/5 focus:outline-none"
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
            isOpen ? 'max-h-96 py-4 border-t border-white/10' : 'max-h-0'
          }`}
        >
          <div className="px-6 flex flex-col gap-3">
            <a
              href={NITROCAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-green-400 text-black font-bold uppercase tracking-[0.12em] text-sm flex items-center justify-center gap-2 shadow-nd-cta"
            >
              NitroCat <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollTo('team')}
              className="px-6 py-3 rounded-full border border-white/30 text-white font-bold uppercase tracking-[0.12em] text-sm hover:bg-white/5 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              Team <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 rounded-full border border-white/30 text-white font-bold uppercase tracking-[0.12em] text-sm hover:bg-white/5 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              Get in touch <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 bg-black text-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(120% 100% at 0% 0%, rgba(108,160,51,0.20), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-spaceGrotesk tracking-tight leading-[1.05] mb-10">
              Making enzymes that <span className="text-green-400">optimize drugs</span> in days
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-6 font-urbanist">
              Starting with any C&ndash;H hydroxylated analog of your lead. In a single reaction step, to accelerate your ADME studies!
            </p>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-6 font-urbanist">
              Made possible by <span className="text-white font-semibold">biocatalytic late-stage functionalization</span> that feels like chemistry.
            </p>

            <p className="text-2xl md:text-3xl text-white max-w-3xl leading-snug font-semibold mb-12 font-urbanist">
              Just draw the reaction and try it.
             </p>

            <a
              href={NITROCAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-green-400 hover:bg-green-300 text-black font-bold uppercase tracking-[0.12em] text-sm shadow-nd-cta transition-all duration-200 hover:-translate-y-0.5"
            >
              Visit NitroCat <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Three picture cards */}
        <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-black to-[#08110A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {cards.map((card, idx) => (
                <div key={idx} className="group p-8 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full aspect-square flex items-center justify-center">
                    <img
                      src={card.img}
                      alt={card.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed font-urbanist text-white/80 mt-8">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />

        {/* Team */}
        <section id="team" className="bg-black py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-2xl md:text-3xl text-white/60 font-urbanist">Sincerely,</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-spaceGrotesk text-white mt-3 mb-16">
              Duckweed Mafia
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[18px] bg-white/[0.03] border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:border-green-400"
                >
                  <div className="w-full aspect-square rounded-[14px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="text-base md:text-lg mt-4 font-bold font-urbanist text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-white/60 font-urbanist">{member.role}</p>
                  <div className="flex flex-row gap-3 mt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-white/50 hover:text-green-400 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-green-400 transition-colors"
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

      <footer className="bg-black border-t border-white/10 text-white/60 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/images/nitroduck_5.png" alt="NitroDuck logo" className="w-10 h-10" />
              <span className="text-xl font-bold ml-2 mt-1 text-white tracking-tight">NITRODUCK</span>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/company/nitroduck-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="NitroDuck on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:mafia@nitroduck.tech"
                className="hover:text-green-400 transition-colors"
                aria-label="Email NitroDuck"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>&copy; 2026 NitroDuck, Inc. &middot; All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
