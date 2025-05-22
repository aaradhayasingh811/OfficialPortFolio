import { Heart, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/aaradhaya-singh-693434257" },
    { icon: <Github className="w-5 h-5" />, url: "https://github.com/aaradhayasingh811" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-bold text-xl flex items-center group">
              <span className="text-blue-400 mr-1 group-hover:rotate-12 transition-transform duration-300">{'{'}</span>
              <span className="text-white">Dev</span>
              <span className="text-purple-400">Portfolio</span>
              <span className="text-blue-400 ml-1 group-hover:-rotate-12 transition-transform duration-300">{'}'}</span>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <nav className="flex flex-wrap justify-center gap-6">
              {['home', 'about', 'skills', 'projects', 'resume', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item === 'home' ? 'hero' : item}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200 capitalize"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              {socialLinks.map(({ icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-800 transition-colors duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            <span>© {currentYear} Aaradhaya Singh. All rights reserved.</span>
            <span>Made with</span>
            <Heart size={14} className="text-red-500" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
