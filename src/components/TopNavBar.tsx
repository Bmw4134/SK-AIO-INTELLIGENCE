import React from 'react';

const TopNavBar: React.FC<{ currentScreen: string; onNavigate: (screen: string) => void }> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'agents', label: 'Agents', icon: 'fas fa-users-cog' },
    { id: 'logs', label: 'Logs', icon: 'fas fa-file-alt' },
    { id: 'heatmap', label: 'Heatmap', icon: 'fas fa-project-diagram' },
    { id: 'timeline', label: 'Timeline', icon: 'fas fa-history' },
    { id: 'security', label: 'Security', icon: 'fas fa-user-shield' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#2a2a2a]">
      <h1 className="text-xl font-semibold tracking-wide text-gray-100 select-none">AI Agent Orchestration</h1>
      <nav className="flex space-x-4 text-gray-400 text-sm font-medium" aria-label="Primary Navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center space-x-2 px-3 py-1 rounded panel-clickable ${
              currentScreen === item.id ? 'text-indigo-400' : ''
            }`}
            type="button"
            aria-current={currentScreen === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default TopNavBar;
