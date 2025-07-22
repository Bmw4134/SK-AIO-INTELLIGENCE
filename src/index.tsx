import React from 'react';
import ReactDOM from 'react-dom/client';
import AgentGrid from './components/AgentGrid';
import EventTimeline from './components/EventTimeline';
import AuditDrawerWrapper from './components/AuditDrawerWrapper';
import AuditConsole from './components/AuditConsole';
import GraphCanvas from './components/GraphCanvas';
import './index.css';

function mountComponent(Component: React.FC<any>, containerId: string, props = {}) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Component {...props} />);
  } else {
    console.warn(`Container with id '${containerId}' not found.`);
  }
}

// Mount AgentGrid into agent-cards-container
mountComponent(AgentGrid, 'agent-cards-container');

// Mount EventTimeline into timeline-event-list container's parent
const timelineEventList = document.getElementById('timeline-event-list');
if (timelineEventList && timelineEventList.parentElement) {
  mountComponent(EventTimeline, timelineEventList.parentElement.id);
} else {
  mountComponent(EventTimeline, 'timeline-event-list');
}

// Mount AuditDrawerWrapper into side-drawer-content container
mountComponent(AuditDrawerWrapper, 'side-drawer-content');

// Mount AuditConsole into bottom-console container
mountComponent(AuditConsole, 'bottom-console');

// Mount GraphCanvas into graph-editor-container
mountComponent(GraphCanvas, 'graph-editor-container');
