'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Droplets, Zap, Mail, Linkedin, Phone} from 'lucide-react';


export default function ContactSection() {
  const [items, setItems] = useState([
    "ELISA kits", 
    "Western blots", 
    "Immunohistochemistry", 
    "Waste-water treatment",    
    "Hydrogels", 

  ]);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      
      setTimeout(() => {
        setItems(prevItems => {
          const newItems = [...prevItems];
          const first = newItems.shift();
          newItems.push(first);
          return newItems;
        });
        setIsRotating(false);
      }, 350); // Half of the 700ms transition
      
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-16 pt-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="p-4 md:p-0 md:max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-6xl font-bold font-spaceGrotesk mb-8">
          Be among the first 21 companies to receive 100 000 units of   <span className="text-green-400">nitroHRP</span>  
        </h2>
        <h2 className="text-xl md:text-4xl font-bold font-spaceGrotesk mt-8 mb-8">
          tailored to your needs - <span className="text-green-400">free of charge</span>
        </h2>
        <p className="text-3xl text-gray-400 mb-12 font-urbanist"></p>
        
        <div id="help" className='flex flex-col md:flex-row gap-4 mt-16 justify-center text-center md:text-left  text-xl md:text-2xl  text-gray-300 font-urbanist items-center md:items-start'>
          <div>
            <p>Just tell us what would help your </p>
          </div>
          <div className='relative grid grid-cols-1 gap-2 text-center justify-center overflow-hidden'>
            {items.map((item, index) => (
              <label
                className={`
                  block text-2xl font-bold font-spaceGrotesk
                  bg-left-bottom bg-gradient-to-r 
                  from-green-400 to-green-400 
                  bg-[length:0%_3px] bg-no-repeat
                  hover:bg-[length:100%_3px]
                  transition-all duration-700 ease-in-out
                  pb-1 cursor-pointer text-center
                  ${index === 0 ? 'text-green-400' : 'text-gray-300'}
                  ${index === 0 && isRotating ? 'animate-fadeSlideOut' : ''}
                  ${index === items.length - 1 && !isRotating ? 'animate-fadeSlideIn' : ''}
                `}
                key={item}
                style={{
                  transform: `translateY(${index * 100}%)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                {item}
              </label>
            ))}
            {/* Spacer to maintain layout height */}
            <div className="opacity-0 pointer-events-none">
              {items.map((item, index) => (
                <div key={index} className="text-2xl font-bold font-spaceGrotesk pb-1 mb-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>  
        
        <h2 className="text-2xl md:text-3xl font-bold font-spaceGrotesk mt-16">
              Book a short, exploratory <a className="
                     font-bold font-spaceGrotesk
                    bg-left-bottom bg-gradient-to-r 
                    from-green-400 to-green-400 
                    bg-[length:0%_3px] bg-no-repeat
                    hover:bg-[length:100%_3px]
                    transition-all duration-500 ease-out 
                    pb-1 cursor-pointer text-green-400
                  ">call</a> today or <a className="
                     font-bold font-spaceGrotesk
                    bg-left-bottom bg-gradient-to-r 
                    from-green-400 to-green-400 
                    bg-[length:0%_3px] bg-no-repeat
                    hover:bg-[length:100%_3px]
                    transition-all duration-500 ease-out 
                    pb-1 cursor-pointer text-green-400
                  " href='mailto:info@nitroduck.tech'>write</a> us. 

            </h2>  
        <div className='flex gap-8 items-center justify-center mt-16'>
              <a
                  href="https://calendar.app.google/CjpUdYyybvT1xaFy6"
                  target='_blank'
                
                  className="px-4 py-3  bg-green-400 text-black text-xl font-semibold rounded-full hover:bg-green-300 transition-colors flex items-center justify-center gap-2"
                >
                  Book a call<Phone className="hidden md:block w-5 h-5" />
                </a>
                <a
                  href="mailto:mafia@nitroduck.tech"
                  target='_blank'
                  
                  className="px-4 py-3  bg-green-400 text-black text-xl font-semibold rounded-full hover:bg-green-300 transition-colors flex items-center justify-center gap-2"
                >
                  Write us <Mail className="hidden md:block w-5 h-5" />
                </a>

              </div>  
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(calc(400% + 20px));
          }
          100% {
            opacity: 1;
            transform: translateY(400%);
          }
        }
        
        @keyframes fadeSlideOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.7s ease-in-out;
        }
        
        .animate-fadeSlideOut {
          animation: fadeSlideOut 0.7s ease-in-out;
        }
      `}</style>
    </section>
  );
}