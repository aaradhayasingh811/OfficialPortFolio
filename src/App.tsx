import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-3xl font-bold text-blue-600 dark:text-blue-400">
          <span className="inline-block animate-bounce">L</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>o</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>a</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>d</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>i</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>n</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>g</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.9s' }}>.</span>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;