import { useEffect, useRef } from 'react';
import { Code, Briefcase, BookOpen, Globe } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const elements = section.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const aboutItems = [
    {
      icon: <Code size={24} className="text-blue-600 dark:text-blue-400" />,
      title: "MERN Stack Developer",
      description: "Specializing in building modern web applications using React, Node.js, Express.js and MongoDB."
    },
    {
      icon: <Briefcase size={24} className="text-purple-600 dark:text-purple-400" />,
      title: "1+ Years Experience",
      description: "Working with startups and established companies to deliver high-quality software solutions."
    },
    {
      icon: <BookOpen size={24} className="text-green-600 dark:text-green-400" />,
      title: "Continuous Learner",
      description: "Always exploring new technologies and methodologies to improve my skills and knowledge."
    },
    {
      icon: <Globe size={24} className="text-orange-600 dark:text-orange-400" />,
      title: "Remote Worker",
      description: "Experienced in working with distributed teams across different time zones and cultures."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            I'm a passionate software developer with a keen eye for detail and a commitment to writing clean, efficient code. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="mb-4 bg-white dark:bg-gray-700 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I’m a Computer Science Engineering student at MMMUT (CGPA: 9.40/10), with a strong foundation in data structures, algorithms, and system design. I specialize in backend development, building scalable APIs and services using Node.js, Express, and MongoDB/MySQL.


            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
             With hands-on experience at Quality Edge Services and Firstbench.ai, I’ve led end-to-end development of high-performance web apps. I’ve also built impactful projects like an AI Trip Planner, Wildlife Sanctuary API, and a Second-hand Bookstore platform.
            </p>
            {/* <p className="text-gray-700 dark:text-gray-300">
              When I'm not coding, you'll find me hiking in the mountains, reading tech blogs, or experimenting with 
              new programming languages and frameworks.
            </p> */}
          </div>
          
          <div className="relative animate-on-scroll opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Name</h4>
                  <p className="font-semibold">Aaradhaya Singh</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Email</h4>
<p className="font-semibold break-words">aaradhayasingh811@gmail.com</p>                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="font-semibold">Gorakhpur</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">Availability</h4>
                  <p className="font-semibold">Available for hire</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {["C++",
  "JavaScript",
  "React.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Docker",
  "OpenAI API"].map((lang, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-full z-0 opacity-20 animate-pulse"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full z-0 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;