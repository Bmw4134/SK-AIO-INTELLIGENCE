import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import useGraphStore from '../store/useGraphStore';

interface AuditConsoleProps {
  // No props needed, data comes from Zustand store
}

const AuditConsole: React.FC<AuditConsoleProps> = () => {
  const messages = useGraphStore((state) => state.events);
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading delay or fetch if needed
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCollapsed();
    }
  };

  function formatEvent(event: any) {
    // Format event object to string
    if (typeof event === 'string') return event;
    if (event.type && event.message) {
      return `[${new Date().toLocaleTimeString()}] ${event.type}: ${event.message}`;
    }
    return JSON.stringify(event);
  }

  if (isLoading) {
    return (
      <section
        aria-live="polite"
        aria-atomic="true"
        aria-label="API activity feed"
        className="fixed bottom-3 right-3 w-96 max-h-56 bg-[#2a2a2a] border border-gray-700 rounded text-gray-300 font-mono text-xs flex flex-col shadow-lg"
      >
        <div
          tabIndex={0}
          role="button"
          aria-expanded={!collapsed}
          aria-controls="audit-console-content"
          className="flex justify-between items-center p-2 bg-[#1f1f1f] border-b border-gray-700 cursor-pointer select-none text-indigo-400 font-semibold rounded-t"
          onClick={toggleCollapsed}
          onKeyDown={handleKeyDown}
          ref={containerRef}
        >
          API Activity Feed (Loading...)
          <button
            aria-label={collapsed ? 'Expand API activity feed' : 'Collapse API activity feed'}
            className="flat-btn"
            type="button"
            onClick={toggleCollapsed}
          >
            <i className={collapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
          </button>
        </div>
        <div className="p-4 flex-1 flex items-center justify-center text-gray-500">Loading messages...</div>
      </section>
    );
  }

  if (messages.length === 0) {
    return (
      <section
        aria-live="polite"
        aria-atomic="true"
        aria-label="API activity feed"
        className="fixed bottom-3 right-3 w-96 max-h-56 bg-[#2a2a2a] border border-gray-700 rounded text-gray-300 font-mono text-xs flex flex-col shadow-lg"
      >
        <div
          tabIndex={0}
          role="button"
          aria-expanded={!collapsed}
          aria-controls="audit-console-content"
          className="flex justify-between items-center p-2 bg-[#1f1f1f] border-b border-gray-700 cursor-pointer select-none text-indigo-400 font-semibold rounded-t"
          onClick={toggleCollapsed}
          onKeyDown={handleKeyDown}
          ref={containerRef}
        >
          API Activity Feed (No messages)
          <button
            aria-label={collapsed ? 'Expand API activity feed' : 'Collapse API activity feed'}
            className="flat-btn"
            type="button"
            onClick={toggleCollapsed}
          >
            <i className={collapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
          </button>
        </div>
        <div className="p-4 flex-1 flex items-center justify-center text-gray-500">No messages to display.</div>
      </section>
    );
  }

  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      aria-label="API activity feed"
      className={`fixed bottom-3 right-3 w-96 max-h-56 bg-[#2a2a2a] border border-gray-700 rounded text-gray-300 font-mono text-xs flex flex-col shadow-lg ${
        collapsed ? 'max-h-8 overflow-hidden' : 'max-h-56 overflow-auto'
      }`}
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        role="button"
        aria-expanded={!collapsed}
        aria-controls="audit-console-content"
        className="flex justify-between items-center p-2 bg-[#1f1f1f] border-b border-gray-700 cursor-pointer select-none text-indigo-400 font-semibold rounded-t"
        onClick={toggleCollapsed}
      >
        API Activity Feed
        <button
          aria-label={collapsed ? 'Expand API activity feed' : 'Collapse API activity feed'}
          className="flat-btn"
          type="button"
          onClick={toggleCollapsed}
        >
          <i className={collapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
        </button>
      </div>
      <div
        id="audit-console-content"
        className="overflow-auto flex-1"
        style={{ maxHeight: '200px' }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="px-2 py-1 border-b border-gray-700 font-mono text-xs text-gray-300"
          >
            {formatEvent(msg)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuditConsole;
