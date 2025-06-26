import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Eye, Code, Globe, Calendar, GitCommit, TrendingUp } from 'lucide-react';
import { Skeleton } from '../ui/skeleton'; 

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  homepage: string | null;
  updated_at: string;
  topics: string[];
  license: {
    spdx_id: string;
  } | null;
  open_issues_count: number;
  size: number;
  archived: boolean;
  fork: boolean;
}

interface GitHubContributions {
  total: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
    }[];
  }[];
}

const GitHubSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular'>('all');
  const [contributions, setContributions] = useState<GitHubContributions | null>(null);
  const [stats, setStats] = useState<{
    stars: number;
    forks: number;
    repos: number;
  } | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/aaradhayasingh811/repos?sort=updated&per_page=100');
        
        if (!reposResponse.ok) {
          throw new Error(`GitHub API limit reached or user not found (${reposResponse.status})`);
        }
        
        const reposData = await reposResponse.json();
        setRepos(reposData);

        // Calculate stats
        const totalStars = reposData.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);
        setStats({
          stars: totalStars,
          forks: totalForks,
          repos: reposData.length
        });

        // Fetch contributions using GitHub's API
        const contributionsResponse = await fetch('https://api.github.com/users/aaradhayasingh811/events');
        if (contributionsResponse.ok) {
          const contributionsData = await contributionsResponse.json();
          const contributionMap: Record<string, number> = {};
          
          contributionsData.forEach((event: any) => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            contributionMap[date] = (contributionMap[date] || 0) + 1;
          });
          
          // Create a structure similar to GitHub's contribution data
          const weeks: any[] = [];
          const today = new Date();
          const startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 365); // Last year
          
          let currentDate = new Date(startDate);
          let currentWeek: any = { contributionDays: [] };
          
          while (currentDate <= today) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const count = contributionMap[dateStr] || 0;
            
            currentWeek.contributionDays.push({
              contributionCount: count,
              date: dateStr
            });
            
            if (currentDate.getDay() === 6 || currentDate >= today) { // Sunday or today
              weeks.push(currentWeek);
              currentWeek = { contributionDays: [] };
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          const totalContributions = Object.values(contributionMap).reduce((sum, count) => sum + count, 0);
          
          setContributions({
            total: totalContributions,
            weeks: weeks
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const filteredRepos = selectedFilter === 'popular' 
    ? repos.filter(repo => repo.stargazers_count > 0 || repo.forks_count > 0)
    : repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars descending
      .slice(0, 25); // Take top 25 projects

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getActivityLevel = (repo: GitHubRepo) => {
    const updatedDate = new Date(repo.updated_at);
    const monthsSinceUpdate = (Date.now() - updatedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsSinceUpdate < 3) return 'high';
    if (monthsSinceUpdate < 6) return 'medium';
    return 'low';
  };

  if (error) {
    return (
      <section id="github" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-red-500 dark:text-red-400 p-8 rounded-lg bg-white dark:bg-gray-800 shadow">
            <Github size={48} className="mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">GitHub Connection Error</h2>
            <p className="text-lg mb-4">{error}</p>
            <p className="text-gray-600 dark:text-gray-400">
              You can still view my GitHub profile directly at{' '}
              <a 
                href="https://github.com/aaradhayasingh811" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                github.com/aaradhayasingh811
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white dark:bg-gray-800 shadow-md mb-4">
            <Github size={32} className="text-gray-900 dark:text-gray-100" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            My GitHub Universe
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my open-source contributions, projects, and coding activity.
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard 
              icon={<Star className="text-yellow-500" size={24} />} 
              value={stats.stars} 
              label="Total Stars" 
            />
            <StatCard 
              icon={<GitFork className="text-blue-500" size={24} />} 
              value={stats.forks} 
              label="Total Forks" 
            />
            <StatCard 
              icon={<Code className="text-green-500" size={24} />} 
              value={stats.repos} 
              label="Public Repos" 
            />
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full bg-white dark:bg-gray-800 p-1 shadow-sm">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Top Projects
            </button>
            <button
              onClick={() => setSelectedFilter('popular')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFilter === 'popular' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Popular
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.length > 0 ? (
              filteredRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} activityLevel={getActivityLevel(repo)} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No repositories found matching the selected filter.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://github.com/aaradhayasingh811"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <Github className="mr-2" size={20} />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

const RepoCard = ({ repo, activityLevel }: { repo: GitHubRepo, activityLevel: string }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getActivityColor = () => {
    switch (activityLevel) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="group relative h-full">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 group-hover:opacity-30 blur transition duration-200"></div>
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="p-6 flex-grow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {repo.name}
                </a>
              </h3>
              {repo.fork && (
                <span className="inline-block text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Forked repository
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {repo.language && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {repo.language}
                </span>
              )}
              <div className={`w-2 h-2 rounded-full ${getActivityColor()}`} title={`Activity level: ${activityLevel}`}></div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {repo.description || 'No description provided'}
          </p>
          
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.slice(0, 3).map(topic => (
                <span 
                  key={topic} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400" title="Stars">
                <Star className="mr-1" size={16} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400" title="Forks">
                <GitFork className="mr-1" size={16} />
                <span>{repo.forks_count}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400" title="Watchers">
                <Eye className="mr-1" size={16} />
                <span>{repo.watchers_count}</span>
              </div>
              {repo.open_issues_count > 0 && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400" title="Open issues">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span>{repo.open_issues_count}</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400" title={`Last updated: ${formatDate(repo.updated_at)}`}>
              <TrendingUp className="inline mr-1" size={12} />
              {formatDate(repo.updated_at)}
            </div>
          </div>
        </div>
        
        <div className="flex border-t border-gray-100 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Live Demo"
            >
              <Globe className="inline mr-1" size={14} />
              Demo
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 text-center text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${repo.homepage ? 'flex-1' : 'w-full'}`}
            title="View on GitHub"
          >
            <Code className="inline mr-1" size={14} />
            Code
          </a>
          {repo.license && (
            <div className="flex-1 py-2 text-center text-xs text-gray-500 dark:text-gray-400" title="License">
              {repo.license.spdx_id}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
      <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default GitHubSection;