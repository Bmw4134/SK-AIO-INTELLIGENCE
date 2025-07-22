import React from 'react';
import Sidebar from './components/Sidebar';
import GraphCanvas from './components/GraphCanvas';
import NodeEditor from './components/NodeEditor';
import EventConsole from './components/EventConsole';
import useGraphStore from './store/useGraphStore';
import './App.css';

const App: React.FC = () => {
  const events = useGraphStore((state) => state.events);
  const selectedNodeId = useGraphStore((state) => state.graph.selectedNodeId);
  const nodes = useGraphStore((state) => state.graph.nodes);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) || null;

  // Convert events to strings for EventConsole
  const eventStrings = events.map(event => 
    `[${new Date().toLocaleTimeString()}] ${event.type}: ${event.message}`
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <GraphCanvas />
        <NodeEditor selectedNode={selectedNode} />
      </div>
      <EventConsole events={eventStrings} />
    </div>
  );
};

export default App;
