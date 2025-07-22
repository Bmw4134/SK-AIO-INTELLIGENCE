import React from 'react';

interface BreadcrumbProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentScreen, onNavigate }) => {
  const crumbs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'agents', label: 'Agents' },
    { id: 'logs', label: 'Logs' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'security', label: 'Security' },
  ];

  const currentIndex = crumbs.findIndex(c => c.id === currentScreen);

  return (
    <nav id="breadcrumb" aria-label="Breadcrumb navigation" role="navigation" className="px-6 py-2 select-none flex flex-wrap gap-2 text-gray-400 text-sm">
      {crumbs.slice(0, currentIndex + 1).map((crumb, index) => (
        <React.Fragment key={crumb.id}>
          {index > 0 && <span aria-hidden="true">›</span>}
          <span
            className={`breadcrumb-item cursor-pointer ${crumb.id === currentScreen ? 'text-indigo-400' : 'hover:underline'}`}
            tabIndex={0}
            role="link"
            onClick={() => onNavigate(crumb.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate(crumb.id);
              }
            }}
          >
            {crumb.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
