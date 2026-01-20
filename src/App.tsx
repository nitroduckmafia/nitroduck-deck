import { ArrowRight, Leaf, Droplets, Zap, Mail, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@nitroduck.bio?subject=Inquiry&body=${email}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/nitroduck_5.png" alt="Nitroduck Logo" className="w-10 h-10" />
            <span className="text-xl font-bold ml-2 mt-1" >NITRODUCK</span>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 py-2 overflow-hidden rounded-full border border-white hover:border-green-400 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              Know More <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></div>
          </button>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-spaceGrotesk mb-8 leading-tight">
                SUPER CLEAN <span className="text-green-400">HRP</span> FROM DUCKWEED
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed font-urbanist">
                We're revolutionizing enzyme production. Nitroduck uses genetically modified duckweed to produce
                pharmaceutical-grade Horseradish Peroxidase (HRP) with unmatched purity and sustainability.
                No fermentation tanks. No complex infrastructure. Just clean, efficient, plant-based manufacturing.
              </p>
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

        <section className="py-16 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-12 text-center">
              <div className="inline-block mb-6">
                <div className="bg-green-400 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                  Award-Winning Innovation
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-spaceGrotesk mb-4">
                iGEM Overgraduate Grand Prize Winner 2025
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-urbanist">
                Recognized globally for pioneering genetically modified duckweed
              </p>
            </div>
          </div>
        </section>

        <section id="technology" className="py-32 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold font-spaceGrotesk mb-16 text-center">
              Why Duckweed for <span className="text-green-400">HRP</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold font-spaceGrotesk mb-4">Ultra-Fast Production</h3>
                <p className="text-gray-400 leading-relaxed font-urbanist">
                  Duckweed doubles its biomass every 48 hours. Our engineered strains express high levels of pure HRP
                  in record time, dramatically reducing time-to-market for enzyme applications.
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mb-6">
                  <Droplets className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold font-spaceGrotesk mb-4">Pharmaceutical Grade</h3>
                <p className="text-gray-400 leading-relaxed font-urbanist">
                  Plant-based HRP avoids bacterial contamination and endotoxin issues. Our purification process
                  yields enzyme of exceptional purity, exceeding industry standards for diagnostic and research applications.
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-green-400 transition-all duration-300">
                <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold font-spaceGrotesk mb-4">Dramatically Cheaper</h3>
                <p className="text-gray-400 leading-relaxed font-urbanist">
                  Traditional HRP production in cell fermentation costs thousands per liter. Our duckweed-based system
                  reduces costs by up to 80%, making premium-quality HRP accessible to researchers worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold font-spaceGrotesk mb-8">
                  Pure <span className="text-green-400">HRP</span> Engineering
                </h2>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed font-urbanist">
                  Our proprietary genetic engineering transforms duckweed into precision HRP factories.
                  Each leaf becomes a bioreactor, producing enzyme with unmatched consistency and purity.
                  The result? Horseradish Peroxidase so clean, it rivals the best laboratory synthesis methods.
                </p>
                <p className="text-xl text-gray-400 leading-relaxed font-urbanist">
                  Whether you need HRP for diagnostics, research, or industrial applications—we deliver
                  pharmaceutical-grade enzyme at a fraction of traditional costs.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl flex items-center justify-center">
                  <img className='w-full h-full object-cover rounded-lg  object-cover ' src='images/duckweed-08409.jpg' />
                </div>  
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold font-spaceGrotesk mb-12">
              HRP Applications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {['Diagnostics & ELISA', 'Research Applications', 'Immunoassays', 'Biotech Manufacturing'].map((app) => (
                <div key={app} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-400 transition-all duration-300">
                  <p className="text-lg font-semibold font-urbanist">{app}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-6 bg-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold font-spaceGrotesk mb-8">
              Get Pure <span className="text-green-400">HRP</span> Today
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-urbanist">
              Ready to experience pharmaceutical-grade Horseradish Peroxidase at a fraction of the cost?
            </p>
            <form onSubmit={handleContact} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-black border border-gray-800 rounded-full focus:outline-none focus:border-green-400 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-green-400 text-black font-semibold rounded-full hover:bg-green-300 transition-colors flex items-center justify-center gap-2"
              >
                Contact Us <Mail className="w-5 h-5" />
              </button>
            </form>
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
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:info@nitroduck.bio" className="hover:text-green-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2025 Nitroduck Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
