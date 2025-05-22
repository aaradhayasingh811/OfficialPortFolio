import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import profile from "../assests/profile.jpeg";
const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const originalText = "Software Developer";
    let index = 0;
    let direction = 1;
    let currentText = "";
    let isDeleting = false;
    
    const typeEffect = () => {
      if (isDeleting) {
        currentText = originalText.substring(0, index);
        index -= direction;
        
        if (index === 0) {
          isDeleting = false;
          setTimeout(() => {
            direction = 1;
          }, 1000);
        }
      } else {
        currentText = originalText.substring(0, index);
        index += direction;
        
        if (index > originalText.length) {
          direction = -1;
          isDeleting = true;
          setTimeout(() => {}, 2000);
        }
      }
      
      if (text) {
        text.textContent = currentText || " ";
      }
      
      const speed = isDeleting ? 50 : 150;
      setTimeout(typeEffect, speed);
    };
    
    setTimeout(typeEffect, 1000);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center z-10">
        <div className="mb-6 overflow-hidden">
          <img 
            src={profile}
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover animate-fadeIn"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Aaradhaya Singh
        </h1>
        
        <div className="flex items-center justify-center h-12 mb-8">
          <h2 ref={textRef} className="text-xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold inline-flex">
            Software Developer
          </h2>
          <span className="w-[2px] h-7 md:h-9 bg-blue-600 dark:bg-blue-400 animate-blink ml-0.5"></span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mb-10 animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          I create elegant, high-performance applications with clean code and 
          exceptional user experiences. Specializing in modern web technologies 
          and passionate about solving complex problems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            Contact Me
          </a>
          <a 
            href="#projects" 
            className="px-8 py-3 rounded-full bg-transparent border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium transition-all duration-300 transform hover:scale-105"
          >
            View Projects
          </a>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="text-gray-600 dark:text-gray-400" size={32} />
      </button>
    </section>
  );
};

export default Hero;