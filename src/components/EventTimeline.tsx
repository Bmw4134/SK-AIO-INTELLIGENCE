import React, { useState, useEffect } from 'react';

interface TimelineEvent {
  id: number;
  timestamp: number;
  agentId: string;
  message: string;
  tag: string;
  severity: string;
  auditLogLink: string;
}

const dummyTimelineEvents: TimelineEvent[] = []; // This will be replaced with real data fetching

const severities = ['high', 'medium', 'low'];

const EventTimeline: React.FC = () => {
  const [filteredSeverities, setFilteredSeverities] = useState(new Set(severities));
  const [events] = useState<TimelineEvent[]>(dummyTimelineEvents);

  useEffect(() => {
    // TODO: Replace with real API call to fetch timeline events
    // For now, keep dummy data
  }, []);

  const handleSeverityChange = (severity: string) => {
    const newSet = new Set(filteredSeverities);
    if (newSet.has(severity)) {
      newSet.delete(severity);
    } else {
      newSet.add(severity);
    }
    setFilteredSeverities(newSet);
  };

  const filteredEvents = events.filter(e => filteredSeverities.has(e.severity));

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {severities.map(sev => (
          <label key={sev} className="inline-flex items-center space-x-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filteredSeverities.has(sev)}
              onChange={() => handleSeverityChange(sev)}
              className="form-checkbox text-indigo-500"
            />
            <span>{sev.charAt(0).toUpperCase() + sev.slice(1)}</span>
          </label>
        ))}
      </div>
      <ul className="flex overflow-x-auto space-x-4 text-xs font-mono text-gray-400 relative" aria-live="polite" aria-relevant="additions" tabIndex={0} role="list">
        {filteredEvents.map(event => (
          <li
            key={event.id}
            className="flex justify-between cursor-pointer hover:text-indigo-400"
            tabIndex={0}
            role="button"
            aria-label={`View audit trace for event ${event.id}`}
            onClick={() => {
              // TODO: Open audit drawer with event details
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // TODO: Open audit drawer with event details
              }
            }}
          >
            [{formatTime(event.timestamp)}] {event.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default EventTimeline;
