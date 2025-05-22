import { useEffect, useRef } from 'react';

const Skills = () => {
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

 const frontendSkills = [
  { name: "React.js", proficiency: 90 },
  { name: "JavaScript", proficiency: 90 },
  { name: "HTML/CSS", proficiency: 95 },
  { name: "Next.js", proficiency: 80 },
  { name: "Tailwind CSS", proficiency: 90 },
  { name: "Bootstrap", proficiency: 85 },
  { name: "Material-UI", proficiency: 80 },
  { name: "Redux", proficiency: 85 },
  { name: "Context API", proficiency: 80 },
  { name: "GSAP", proficiency: 70 }
];


 const backendSkills = [
  { name: "Node.js", proficiency: 90 },
  { name: "Express.js", proficiency: 85 },
  { name: "Python", proficiency: 75 },
  { name: "MongoDB", proficiency: 85 },
  { name: "MySQL", proficiency: 80 },
  { name: "RESTful APIs", proficiency: 90 },
  { name: "JWT", proficiency: 80 },
  { name: "OAuth", proficiency: 75 },
  { name: "API Integration", proficiency: 85 }
];


 const otherSkills = [
  { name: "Git/GitHub", proficiency: 90 },
  { name: "Docker", proficiency: 75 },
  { name: "Postman", proficiency: 85 },
  { name: "Linux", proficiency: 80 },
  { name: "Vercel/Netlify", proficiency: 85 },
  { name: "Testing/Debugging", proficiency: 80 }
];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0">
            My Skills
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            I've developed expertise in various technologies through hands-on experience and continuous learning.
            Here's a breakdown of my technical skills and proficiency levels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <SkillCategory 
            title="Frontend Development" 
            skills={frontendSkills} 
            delay={0.4}
            gradientFrom="from-blue-600" 
            gradientTo="to-purple-600" 
          />
          
          <SkillCategory 
            title="Backend Development" 
            skills={backendSkills} 
            delay={0.6}
            gradientFrom="from-green-600" 
            gradientTo="to-teal-600" 
          />
          
          <SkillCategory 
            title="Other Skills" 
            skills={otherSkills} 
            delay={0.8}
            gradientFrom="from-orange-600" 
            gradientTo="to-red-600" 
          />
        </div>

        <div className="mt-20 animate-on-scroll opacity-0" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold mb-8 text-center">Tools & Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              
  "C++",
  "C",
  "Python",
  "JavaScript",
  "SQL",
  "Shell Scripting",
  "HTML",
  "CSS",
  "React.js",
  "Redux",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Context API",
  "GSAP",
  "Node.js",
  "Express.js",
  "RESTful APIs",
  "JWT",
  "OAuth",
  "React Query",
  "API Integration",
  "MongoDB",
  "MySQL",
  "MongoDB Pipelining",
  "Postman",
  "Netlify",
  "Vercel",
  "Vite",
  "Docker",
  "Linux",
  "Git",
  "GitHub",
  "OpenAI API",
  "Stripe",
  "Cloudinary",
  "Nodemailer",
  "Multer",
  "Axios",
  "CORS",
  "Figma",
  "Canva",
  


            ].map((tool, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillCategoryProps {
  title: string;
  skills: { name: string; proficiency: number }[];
  delay: number;
  gradientFrom: string;
  gradientTo: string;
}

const SkillCategory = ({ title, skills, delay, gradientFrom, gradientTo }: SkillCategoryProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 animate-on-scroll opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <h3 className="text-xl font-semibold mb-6 text-center">{title}</h3>
      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{skill.name}</span>
              <span className="text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${gradientFrom} ${gradientTo} bg-gradient-to-r rounded-full`}
                style={{ 
                  width: `${skill.proficiency}%`,
                  transition: 'width 1.5s ease-in-out',
                  animationDelay: `${delay + 0.2 * index}s`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;