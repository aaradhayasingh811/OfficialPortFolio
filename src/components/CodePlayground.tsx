import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FiPlay, FiCopy, FiMaximize2, FiMinimize2, FiRefreshCw, FiSun, FiMoon } from 'react-icons/fi';

type Language = 'javascript' | 'typescript' | 'html' | 'css';

const CodePlayground = () => {
  const [code, setCode] = useState<string>(
    `// Welcome to the Code Playground!\n// Try running this code to see the output\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconst message = greet("Developer");\nconsole.log(message);\nconsole.log({ timestamp: new Date(), success: true });`
  );
  const [language, setLanguage] = useState<Language>('javascript');
  const [output, setOutput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle dark mode and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const formatOutput = (args: any[]): string => {
    return args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
  };

  const runCode = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput('');
    
    try {
      const logs: string[] = [];
      const consoleCapture = {
        log: (...args: any[]) => logs.push(formatOutput(args)),
        warn: (...args: any[]) => logs.push(`⚠️ WARN: ${formatOutput(args)}`),
        error: (...args: any[]) => logs.push(`❌ ERROR: ${formatOutput(args)}`),
        info: (...args: any[]) => logs.push(`ℹ️ INFO: ${formatOutput(args)}`),
      };

      if (language === 'javascript' || language === 'typescript') {
        try {
          const returnValue = new Function(
            'console', 
            `try { 
              return (function() { 
                ${code} 
              })(); 
            } catch (err) { 
              console.error(err); 
              return undefined; 
            }`
          )(consoleCapture);

          if (returnValue !== undefined) {
            logs.push(`➡️ Return value: ${formatOutput([returnValue])}`);
          }

          setOutput(logs.join('\n') || '🎉 Code executed successfully (no output)');
        } catch (err) {
          logs.push(`🔥 Uncaught error: ${err instanceof Error ? err.message : String(err)}`);
          setOutput(logs.join('\n'));
        }
      } 
      else if (language === 'html') {
        setOutput(`📄 HTML Content:\n\n${code}`);
      } 
      else if (language === 'css') {
        setOutput(`🎨 CSS Styles:\n\n${code}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(`// Try me! 🚀\nfunction example() {\n  return "Hello, world!";\n}\n\nconsole.log(example());`);
    setOutput('');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Close expanded view when clicking outside (for mobile)
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.code-playground-container')) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  return (
    <div className={`relative h-full flex flex-col ${darkMode ? 'dark' : ''}`}>
      <div 
        className={`code-playground-container rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${isExpanded ? 'fixed inset-0 z-50 m-0' : 'h-full'}`}
      >
        {/* Header with controls */}
        <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex space-x-1 mr-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/20 dark:bg-gray-700/80 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all backdrop-blur-sm"
            >
              <option value="javascript" className="bg-gray-800 text-white">JS</option>
              <option value="typescript" className="bg-gray-800 text-white">TS</option>
              <option value="html" className="bg-gray-800 text-white">HTML</option>
              <option value="css" className="bg-gray-800 text-white">CSS</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!isMobile && (
              <button 
                onClick={toggleDarkMode}
                className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                title={darkMode ? "Light mode" : "Dark mode"}
              >
                {darkMode ? <FiSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            )}
            
            <button 
              onClick={resetCode}
              className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              title="Reset Code"
            >
              <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="relative">
              <button 
                onClick={copyCode}
                className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                title="Copy Code"
              >
                <FiCopy className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              {showCopied && (
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  Copied!
                </div>
              )}
            </div>
            
            <button 
              onClick={runCode}
              disabled={isRunning}
              className={`p-1 sm:p-2 rounded-lg transition-colors ${isRunning ? 'bg-white/20 text-white/50' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              title="Run Code"
            >
              <FiPlay className={`w-4 h-4 sm:w-5 sm:h-5 ${isRunning ? 'animate-pulse' : ''}`} />
            </button>
            
            <button 
              onClick={toggleExpand}
              className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <FiMinimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMaximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
        
        {/* Editor area */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height={isExpanded ? 'calc(100vh - 100px)' : '100%'}
            language={language}
            theme={darkMode ? 'vs-dark' : 'light'}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: isMobile ? 12 : 14,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              fontLigatures: true,
              renderWhitespace: 'selection',
              padding: { top: 10, bottom: 10 },
              lineNumbersMinChars: isMobile ? 2 : 3,
              folding: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>
        
        {/* Output panel */}
        <div className={`bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${output ? 'max-h-64' : 'max-h-0'}`}>
          <div className="p-3 sm:p-4 h-full overflow-auto">
            {output ? (
              <div className="font-mono text-xs sm:text-sm">
                <div className="flex items-center mb-1 sm:mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1 sm:mr-2"></div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Output</span>
                </div>
                <pre className="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-900/50 p-2 sm:p-3 rounded-lg overflow-x-auto">{output}</pre>
              </div>
            ) : null}
            
            {language === 'html' && output && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-1 sm:mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1 sm:mr-2"></div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Rendered Output</span>
                </div>
                <iframe 
                  srcDoc={code}
                  className="w-full h-48 sm:h-64 border border-gray-300 dark:border-gray-600 bg-white rounded-lg shadow-sm"
                  sandbox="allow-scripts"
                  title="HTML Output"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;