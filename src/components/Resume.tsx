import { useState, useEffect, useRef } from 'react';
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react';

const Resume = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');
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

  const experienceData = [
    {
      role: " Software Developer",
      company: " Quality Edge Services Pvt. Ltd.",
      period: "March 2025 - Jun 2025",
      
      achievements: [
        " Spearheaded end-to-end product development by independently designing intuitive UI/UX, building responsive frontends with React.js and Tailwind CSS, and implementing robust backend systems with Node.js and MongoDB.",
        "Optimized application performance by integrating RESTful APIs, reducing load time by 10%, and ensuring seamless data flow.",
        "Conducted code reviews"
      ]
    },
    {
      role: "Frontend Engineer",
      company: " Firstbench.ai",
      period: "Jan 2025 - Jun 2025",
      achievements: [
        "Boosted user engagement by 15% by crafting responsive user interfaces with React.js and Tailwind CSS.",
        "Optimized application performance and reduced load time by 10% by integrating RESTful APIs.",
        
      ]
    },
    {
      role: " Software Development Engineer",
      company: "Intotag Pvt. Solutions Ltd.",
      period: "Apr 2024 - Jul 2024",
      
      achievements: [
        " Enhanced code quality and scalability by writing clean, efficient code and effectively debugging and resolving issues.",
        "Designed, developed, and tested software solutions through effective collaboration with the development team.",
        
      ]
    }
  ];

  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Madan Mohan Malaviya University of Technology Gorakhpur",
      period: "2022 - 2026",
      description: "Pursuing a degree in Computer Science with a focus on software development, algorithms, and data structures.",
      achievements: [
        "CGPA: 9.40/10",
        "Member of the university's coding club and participated in various hackathons.",
        "Rank 1 in the Computer Science and Engineering (CSE) batch of 2022-26 at MMMUT."
      ]
    },
    {
      degree: "Intermediate in Science",
      institution: "Nyaya Nagar Public School",
      period: "2021 - 2022",
      description: "Completed intermediate education with a focus on science subjects.",
      achievements: [
        "Percentage: 96.4%",
        "Achieved 100% in Chemistry and 90+ in rest subjects.",
        "Rank 1 in the school for the academic year."
      ]
    },
    {
      degree: "High School",
      institution: "Nyaya Nagar Public School",
      period: "2019 - 2020",
      description: "Completed high school education with a focus on science and mathematics.",
      achievements: [
        "Percentage: 96.2%",
        "Achieved 100% in Mathematics, Social Science ,Computer Science and 99% in Science.",
        "Rank 1 in the school for the academic year."
      ]
    }
  ];

  const certificationsData = [
    {
      title: "Getting Started with Competitive Programming",
      issuer: "NPTEL",
      date: "2024",
      description: "Certification in competitive programming, focusing on problem-solving and algorithmic techniques."
    },
    {
      title: "Introduction to Machine Learning",
      issuer: "NPTEL",
      date: "2025",
      description: "Certification in machine learning concepts, algorithms, and applications."
    },
    {
      title: "Annual Fest Conduction",
      issuer: "Institution's Innovation Council ",
      date: "2025",
      description: "Certification for organizing and conducting the annual fest at MMMUT, showcasing leadership and event management skills."
    },
    
  ];

  return (
    <section 
      id="resume" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0">
            My Resume
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            My professional journey showcases a blend of technical expertise, collaborative work, and 
            continuous learning. Here's a snapshot of my career path, education, and certifications.
          </p>
          
          <a 
            href="https://drive.google.com/file/d/1Gu2kSaGE_mb4aRMahKAudvDTLyyc8Z4L/view?usp=sharing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-on-scroll opacity-0"
            target="_blank" 
            style={{ animationDelay: '0.4s' }}
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.5s' }}>
            <TabButton 
              icon={<Briefcase size={18} />}
              label="Experience"
              isActive={activeTab === 'experience'}
              onClick={() => setActiveTab('experience')}
            />
            <TabButton 
              icon={<GraduationCap size={18} />}
              label="Education"
              isActive={activeTab === 'education'}
              onClick={() => setActiveTab('education')}
            />
            <TabButton 
              icon={<Award size={18} />}
              label="Certifications"
              isActive={activeTab === 'certifications'}
              onClick={() => setActiveTab('certifications')}
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
            {activeTab === 'experience' && (
              <div className="space-y-10">
                {experienceData.map((item, index) => (
                  <ResumeItem 
                    key={index}
                    title={item.role}
                    subtitle={item.company}
                    period={item.period}
                    
                    achievements={item.achievements}
                    isLast={index === experienceData.length - 1}
                  />
                ))}
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="space-y-10">
                {educationData.map((item, index) => (
                  <ResumeItem 
                    key={index}
                    title={item.degree}
                    subtitle={item.institution}
                    period={item.period}
                    description={item.description}
                    achievements={item.achievements}
                    isLast={index === educationData.length - 1}
                  />
                ))}
              </div>
            )}
            
            {activeTab === 'certifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificationsData.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{item.issuer}</p>
{item.description && (
  <p className="text-gray-700 dark:text-gray-300 mb-4">
    {item.description}
  </p>
)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface ResumeItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string; 
  achievements?: string[];
  isLast?: boolean;
}


const ResumeItem = ({ title, subtitle, period, description, achievements, isLast = false }: ResumeItemProps) => {
  return (
    <div className={`relative ${!isLast ? 'pb-10' : ''}`}>
      {!isLast && (
        <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 relative z-10">
        <div className="md:w-56 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Briefcase size={16} />
            </div>
            <span className="text-gray-600 dark:text-gray-400">{period}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-blue-600 dark:text-blue-400 mb-3">{subtitle}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {description}
          </p>
          
          {achievements && achievements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;