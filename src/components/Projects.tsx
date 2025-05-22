import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Simulating project data - in a real app, this could come from an API
    const projectData: Project[] = [
      {
        id: 1,
        title: "NovelNest - A Second Hand Book Platform",
        description: "A full-stack e-commerce platform built with React.js, Node.js, and MongoDB for buying and selling first-hand and second-hand books. Features include robust user authentication, comprehensive product listing management, seamless cart functionality, secure payment processing, and a tailored experience for both shopkeepers and consumers.",
        image: "https://plus.unsplash.com/premium_photo-1667251758769-398dca4d5f1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b25saW5lJTIwc2Vjb25kJTIwaGFuZCUyMGJvb2t8ZW58MHx8MHx8fDA%3D",
        tags: ["React", "Node.js", "MongoDB", "Express", "Fullstack", "Frontend", "Backend", "Stripe", "Tailwind CSS", "Cloudinary"],
        demoLink: "https://online-second-hand-book.vercel.app/",
        githubLink: "https://github.com/aaradhayasingh811/OnlineSecondHandBook",
        featured: true
      },
      {
        id: 2,
        title: "Wildlife Sanctuary Api",
        description: "The Wildlife Sanctuary API is a comprehensive system designed to facilitate the management, monitoring, and engagement of activities within a wildlife sanctuary. It provides structured endpoints for various stakeholders, including staff, researchers, volunteers, and visitors, ensuring seamless interaction with the sanctuary’s digital ecosystem.",
        image: "https://plus.unsplash.com/premium_photo-1661832611972-b6ee1aba3581?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lsZGxpZmUlMjBzYW50dWFyeXxlbnwwfHwwfHx8MA%3D%3D",
        tags: ["Nodejs", "ExpressJs", "MongoDb", "Backend", "RestfulAPI"],
        demoLink: "https://wildlife-sanctuary-api.onrender.com/api/v1",
        githubLink: "https://github.com/aaradhayasingh811/WildLife_Sanctuary_Api",
        featured: true
      },
      {
        id: 3,
        title: "Smart AI Trip Planner",
        description: "Developed an AI-driven travel planning application using OpenAI API to personalize trip plans for users.",
        image: "https://images.unsplash.com/photo-1673515336319-20a3ea59c228?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyaXAlMjBwbGFubmVyfGVufDB8fDB8fHww",
        tags: [" React.js", "Tailwind CSS", "OpenAI API", "Node.js", "MongoDB", "Express.js","Fullstack", "Frontend", "Backend"],
        demoLink: "https://smarttripplannerbyaaru.netlify.app/",
        githubLink: "https://github.com/aaradhayasingh811/frontend_smart_trip_planner",
        featured: false
      },
      {
        id: 4,
        title: "Dynamo Dashboard",
        description: "Dynamo Dashboard ,A modern, responsive frontend for Dynamo, a dashboard application that provides insightful test results, scores, and advanced visualizations. This project focuses on delivering an intuitive and interactive user experience with advanced data representation and subject-based insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tags: [ "TailwindCSS", "Reactjs", "Frontend"],
        demoLink: "https://first-benchfrontend.vercel.app/",
        githubLink: "https://github.com/aaradhayasingh811/First_Bench_frontend",
        featured: false
      },
      {
        id: 5,
        title: "Computer Engineering Society Website",
        description: "A responsive website for the Computer Engineering Society of MMMUT, Gorakhpur. Built with HTML, CSS, and JavaScript, it features a modern design and user-friendly navigation.",
        image: "https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29tcHV0ZXIlMjBlbmdpbmVlcmluZyUyMHNjb2V0eXxlbnwwfHwwfHx8MA%3D%3D",
        tags: ["HTML", "CSS","Javascript", "Frontend"],
        demoLink: "https://cesmmmut.netlify.app/",
        githubLink: "https://github.com/aaradhayasingh811/ces-official-draft",
        featured: true
      },
      {
        id: 6,
        title: "InstaClone",
        description: "Built a responsive Instagram clone using HTML and CSS. The project showcases a modern design and user-friendly interface, mimicking the core features of Instagram.",
        image:"https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5zdGFncmFtfGVufDB8fDB8fHww",
        tags: ["HTML", "CSS", "Frontend"],
        demoLink: "https://aaradhayasingh811.github.io/instagram-clone/",
        githubLink: "https://github.com/aaradhayasingh811/instagram-clone",
        featured: false
      }
    ];
    
    setProjects(projectData);
    setFilteredProjects(projectData);
  }, []);
  
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else if (filter === 'featured') {
      setFilteredProjects(projects.filter(project => project.featured));
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(filter)));
    }
  }, [filter, projects]);
  
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
  }, [filteredProjects]);
  
  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'featured', label: 'Featured' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0">
            My Projects
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
            Here are some of the projects I've worked on. Each project represents different skills and challenges I've tackled.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
          {filters.map((item, index) => (
            <button
              key={index}
              onClick={() => setFilter(item.value)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === item.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll opacity-0"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs font-medium px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs font-medium px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Code</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 animate-on-scroll opacity-0">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              No projects found with the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;