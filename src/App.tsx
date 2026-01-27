import { ArrowRight, Leaf, Droplets, Zap, Mail, Linkedin, Phone} from 'lucide-react';
import { useEffect, useState } from 'react';
import HeroText from './components/main_page/HeroText';
import HeroText2 from './components/main_page/HeroText2';
import HeroTextMobile from './components/main_page/HeroTextMobile';
import ContactSection from './components/main_page/ContactSection';


function App() {

  const members = [

    { name: 'Matej Zámečník', role: 'Co-Founder & CEO', img: '/images/team/matej.jpg', email: 'matej@nitroduck.tech', linkedin: 'https://www.linkedin.com/in/matejzamecnik/' },
    { name: 'Matúš Grieš', role: 'Co-Founder', img: '/images/team/matus.jpg', email: 'matus@nitroduck.tech', linkedin: 'https://www.linkedin.com/in/mat%C3%BA%C5%A1-grie%C5%A1-45b655202/' },
    { name: 'Miroslav Rosputinsky', role: 'Co-Founder', img: '/images/team/miro.jpg', email: 'miro@nitroduck.tech', linkedin: 'https://www.linkedin.com/in/miroslav-rosputinsk%C3%BD-23b759307/' },
    { name: 'Pravoslav Žilka', role: 'Head of Upstream', img: '/images/team/pravoslav.jpg', email: 'pravoslav@nitroduck.tech', linkedin: 'https://www.linkedin.com/in/pravoslav-zilka/' },
    { name: 'Jonáš Pospíchal', role: 'Head of Downstream', img: '/images/team/jonas.jpg', email: 'jonas@nitroduck.tech', linkedin: 'https://www.linkedin.com/in/jon%C3%A1%C5%A1-posp%C3%ADchal-b7650a382/' },
  ]

  const [email, setEmail] = useState('');

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:mafia@nitroduck.bio?subject=Inquiry&body=${email}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // close mobile menu after click
  };

  const scrollToTeam = () => {
    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // close mobile menu after click
  };

  const scrollToTechnology = () => {
    document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // close mobile menu after click
  };

  const words = [
  "ELISA kits",
  "Western blots",
  "immunohistochemistry",
  "hydrogels",
  "waste-water treatment",
] as const;

 
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const currentWord = index === -1 ? "stuff" : words[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFading(false);
      }, 500); // match transition duration

      return () => clearTimeout(timeout);
    }, 2200); // slightly longer than transition + pause

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white break-words">
      

    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src="/images/nitroduck_5.png" alt="Nitroduck Logo" className="w-10 h-10" />
          <span className="text-xl font-bold ml-2 mt-1">NITRODUCK</span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={scrollToTechnology}
            className="group relative px-6 py-2 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              Technology <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>

          <button
            onClick={scrollToTeam}
            className="group relative px-6 py-2 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              Team <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>

          <button
            onClick={scrollToContact}
            className="group relative px-6 py-2 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              Know More <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-md hover:bg-gray-800/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Close icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 py-4 border-t border-gray-800' : 'max-h-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-4">
          <button
            onClick={scrollToTechnology}
            className="group relative px-6 py-3 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
              Technology <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>

          <button
            onClick={scrollToTeam}
            className="group relative px-6 py-3 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
              Team <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>

          <button
            onClick={scrollToContact}
            className="group relative px-6 py-3 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300 text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
              Know More <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>
        </div>
      </div>
    </div>


      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="md:max-w-6xl">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-spaceGrotesk mb-8 leading-tight">
                Making biomanufacturing of complex proteins  <span className="text-green-400">SCALABLE</span> 
              </h1>
              <p className="text-2xl md:text-3xl md:text-4xl text-gray-400 mb-4 max-w-4xl leading-relaxed font-urbanist">
                Starting with better <b className="text-white">horseradish peroxidase (<span className='text-green-400'>HRP</span>),</b>
              </p>
              <div className="hidden md:block" >
                <HeroText />
              </div>
              <div className='block md:hidden'>
                <HeroTextMobile />
              </div>
              
              {/* 
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 overflow-hidden rounded-full bg-green-400 text-black font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Technology <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
              */}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-12 text-center">
              <div className="inline-block mb-6">
                <div className="bg-green-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                  Powered by 
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-spaceGrotesk mb-4">
               <a
                href="https://competition.igem.org/results/2025"
                target="_blank"
                className="
                  font-bold font-spaceGrotesk
                  relative
                  pb-1
                  after:content-['']
                  after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
                  after:w-0 after:h-[3px] after:bg-green-400
                  after:transition-all after:duration-500 after:ease-out
                  hover:after:w-full
                  cursor-pointer
                "
              >
                iGEM Grand Prize–winning plant-based technology
              </a>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto font-urbanist mt-8">
                that maintains proper glycosylation and ensures a reliable supply of recombinant HRP
              </p>
            </div>
          </div>
        </section>

        <section id="technology" className="py-10 px-6 bg-gray-900 text-justify">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className=" rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className="rounded-lg flex items-center justify-center relative overflow-hidden w-full max-w-[350px] mx-auto h-75">
                  <img src="images/Picture3.png" className=" w-full h-full object-cover "/>
                </div>
                <p className="text-xl leading-relaxed font-urbanist mt-8 ">
                    Duckweed, the smallest and fastest-growing higher plant, carries an HRP (single isoform VI) transgene engineered to your exact specifications (<a href='https://pubmed.ncbi.nlm.nih.gov/11505379/' target='_blank' className='text-green-400'>better thermal stability</a>, <a href='https://pubmed.ncbi.nlm.nih.gov/10835112/' target='_blank' className='text-green-400'>catalytic activity</a> or <a href='https://pubmed.ncbi.nlm.nih.gov/17482746/' target='_blank' className='text-green-400'>H202 tolerance</a>).                </p>
                <div className="mt-4">
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/icon1.webp" className="h-14 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>PRXC1A transgene from horseradish </label>
                  </span>
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/icon2.webp" className="h-12 ml-1 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>Customizable to meet your expectations </label>
                  </span>
                </div>
              </div>

              <div className="rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className=" rounded-lg flex items-center justify-center relative overflow-hidden w-full max-w-[350px] mx-auto h-75">
                  <img src="images/Picture4.png" className=" w-full h-full object-cover "/>
                </div>
                <p className="text-xl leading-relaxed font-urbanist mt-8 ">
                  Our autonomous cultivation system produces HRP-rich plant biomass from duckweed, which grows up to 100× faster than horseradish and is unaffected by outdoor environmental fluctuations.
                  </p>

                  <div className="mt-4">
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/icon3.webp" className="h-14 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>100x faster accumulation of biomass </label>
                  </span>
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/icon4.webp" className="h-12 ml-1 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>Unaffected by outdoor fluctuations </label>
                  </span>

                </div>
              </div>

              <div className=" rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className="rounded-lg flex items-center justify-center relative overflow-hidden w-full max-w-[350px] mx-auto h-75">
                  <img src="images/Picture5.png" className=" w-full h-full object-cover "/>
                </div>
                <p className="text-xl leading-relaxed font-urbanist mt-8 ">
                  Secretion of HRP from duckweed biomass is induced, enabling streamlined downstream processing and resulting in clean (RZ 3), 100% single-isoform HRP (VI) at the same cost as the native enzyme.
                </p>

                <div className="mt-4">
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/icon5.webp" className="h-14 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>100% single isoform at &gt;RZ 3 purity </label>
                  </span>
                  <span className='flex flex-row items-center gap-4'>
                    <img src="images/icons/Vector.svg" className="h-10 ml-1 mt-4 object-contain "/>
                    <label className='text-left text-large md:text-xl font-bold font-spaceGrotesk mt-6'>At the same cost as native HRP </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


         <ContactSection />       


        

        <section id='team' className="   bg-black ">
          
          
          <div className="max-w-7xl mx-auto pb-16">
            <p className="text-3xl md:text-4xl mt-24   ml-4 mb-12 font-urbanist">
              Sincerely

            </p>
            
            <h2 className="text-4xl md:text-5xl ml-4 md:text-6xl font-bold font-spaceGrotesk mb-12">
              Duckweed Mafia
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mt-12 items-center justify-center">
                {members.map((member) => (
                <div key={member.name} className="rounded-xl  p-6 hover:border-green-400 transition-all duration-300">
                  <div className="w-52 h-52 rounded-lg flex items-center justify-center relative"
                                          >
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-lg object-cover object-top" />
                  </div>
                  <p className="text-lg mt-4 font-semibold font-urbanist">{member.name}</p>
                  <p>{member.role}</p>
                  
                  <div className='flex flex-row gap-4 mt-4'>
                  
                  <a href={`mailto:${member.email}`} className="hover:text-green-400 transition-colors">
                    <Mail className="w-6 h-6" />
                  </a>
                  
                  <a href={`${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                  </a>
                  

                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <footer className="bg-black border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
            <img src="/images/nitroduck_5.png" alt="Nitroduck Logo" className="w-10 h-10" />
            <span className="text-xl font-bold ml-2 mt-1" >NITRODUCK</span>
          </div>
            <div className="flex gap-6">
              
              <a href="https://www.linkedin.com/company/nitroduck-tech/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:mafia@nitroduck.bio" className="hover:text-green-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2026 Nitroduck, Inc. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
