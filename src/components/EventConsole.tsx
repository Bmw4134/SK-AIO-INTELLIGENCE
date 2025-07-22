import React from 'react';

interface EventConsoleProps {
  events: string[];
}

const EventConsole: React.FC<EventConsoleProps> = ({ events }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <section
      ref={containerRef}
      className="h-36 bg-gray-900 p-4 overflow-auto border-t border-gray-700 shadow-inner font-mono text-xs text-gray-400"
      aria-live="polite"
      aria-atomic="false"
    >
      <h4 className="mb-2 text-lg font-semibold text-gray-200">Event Console</h4>
      <div>
        {events.map((event, index) => (
          <div key={index} className="mb-1">
            {event}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventConsole;
