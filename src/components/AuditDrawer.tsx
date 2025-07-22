import React from 'react';

interface AuditDrawerProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const AuditDrawer: React.FC<AuditDrawerProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <aside
      role="region"
      aria-label="Audit Drawer"
      className="fixed top-0 right-0 w-96 h-full bg-[#2a2a2a] border-l border-gray-700 p-4 overflow-auto text-gray-300 z-50 shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close audit drawer"
          className="text-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          &times;
        </button>
      </div>
      <pre className="whitespace-pre-wrap font-mono text-xs">{content}</pre>
    </aside>
  );
};

export default AuditDrawer;
