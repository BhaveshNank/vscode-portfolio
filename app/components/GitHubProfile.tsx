// ============================================================================
// 🔧 GITHUB PROFILE INTEGRATION
// ============================================================================
// ⚠️ CRITICAL: You MUST change the GitHub username below!
//
// This component fetches real-time data from the GitHub API:
// - Profile information (avatar, bio, follower count)
// - Repository count and total stars
// - Recent repositories
//
// API NOTES:
// - Rate limit: 60 requests/hour (unauthenticated)
// - For higher limits, add a GitHub Personal Access Token
// - Ensure your GitHub profile is public
//
// TO CUSTOMIZE:
// 1. Replace 'BhaveshNank' with YOUR GitHub username (line ~56 and ~61)
// 2. Test that your profile loads correctly
// 3. Consider adding a token for higher rate limits (optional)
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Star, GitFork, Circle } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
  blog: string;
}

export default function GitHubProfile() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // ========================================================================
        // 🔧 CUSTOMIZE: Replace 'BhaveshNank' with YOUR GitHub username
        // ========================================================================
        const GITHUB_USERNAME = 'BhaveshNank';  // ⚠️ CHANGE THIS!
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();
        console.log('User data fetched:', userData.login, 'public_repos:', userData.public_repos);
        setUser(userData);

        // Fetch repositories - get owner repos only
        const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&affiliation=owner`;
        console.log('Fetching repos from:', reposUrl);
        
        const reposResponse = await fetch(reposUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        console.log('API Response Status:', reposResponse.status);
        const reposData = await reposResponse.json();
        
        console.log('Total repos fetched:', reposData.length);
        console.log('All repo names:', reposData.map((r: Repository) => r.name));
        console.log('Fork count:', reposData.filter((r: Repository) => r.fork).length);
        console.log('Non-fork count:', reposData.filter((r: Repository) => !r.fork).length);
        
        // Show all repositories including forks
        setRepos(reposData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      React: '#61dafb',
      'Jupyter Notebook': '#DA5B0B',
    };
    return colors[language] || '#8b949e';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `Updated ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    
    const diffYears = Math.floor(diffMonths / 12);
    return `Updated ${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-vscode-bg">
        <div className="text-vscode-textMuted">Loading GitHub profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-vscode-bg">
        <div className="text-vscode-textMuted">Failed to load GitHub profile</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-vscode-bg p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-vscode-border">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-32 h-32 rounded-full border-2 border-vscode-border"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vscode-activityBarBadge hover:underline flex items-center gap-1"
              >
                <span className="text-sm">@{user.login}</span>
                <ExternalLink size={14} />
              </a>
            </div>
            {user.bio && (
              <p className="text-vscode-text mb-4">{user.bio}</p>
            )}
            <div className="flex items-center gap-6 text-sm text-vscode-textMuted mb-3">
              <div>
                <span className="font-semibold text-white">{user.public_repos}</span> repositories
              </div>
              <div>
                <span className="font-semibold text-white">{user.followers}</span> followers
              </div>
              <div>
                <span className="font-semibold text-white">{user.following}</span> following
              </div>
            </div>
            {user.location && (
              <div className="text-sm text-vscode-textMuted mb-2">
                📍 {user.location}
              </div>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-vscode-activityBarBadge hover:underline flex items-center gap-1"
              >
                🔗 {user.blog}
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Custom README Notice */}
        <div className="mb-8 p-4 bg-vscode-sidebar border border-vscode-activityBarBadge rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="text-white font-semibold mb-1">Custom Profile README</h3>
              <p className="text-sm text-vscode-textMuted mb-2">
                My GitHub profile includes a detailed README with featured projects, tech stack, and more!
              </p>
              <a
                href="https://github.com/BhaveshNank"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-vscode-activityBarBadge hover:underline"
              >
                View Full Profile with README
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Repositories */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Repositories ({repos.length})</h2>
          <div className="grid gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-vscode-sidebar border border-vscode-border rounded hover:border-vscode-activityBarBadge transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-vscode-activityBarBadge group-hover:underline flex items-center gap-2">
                    {repo.name}
                    <ExternalLink size={16} />
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-vscode-textMuted">
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
                {repo.description && (
                  <p className="text-sm text-vscode-textMuted mb-3">{repo.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-vscode-textMuted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <Circle size={10} fill={getLanguageColor(repo.language)} color={getLanguageColor(repo.language)} />
                      {repo.language}
                    </span>
                  )}
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* View Full Profile Button */}
        <div className="mt-8 text-center">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-vscode-activityBarBadge text-white rounded hover:bg-opacity-90 transition-colors"
          >
            View Full Profile on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
