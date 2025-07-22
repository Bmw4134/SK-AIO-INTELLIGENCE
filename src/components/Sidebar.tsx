import React, { useEffect } from 'react';
import useGraphStore from '../store/useGraphStore';
import { callPerplexityAPI } from '../api/apiClient';

const Sidebar: React.FC = () => {
  const { agents, setAgents, selectAgent, selectedAgentId } = useGraphStore();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // This is a placeholder to demonstrate API wiring.
        // A real implementation would have a dedicated endpoint to fetch agents.
        console.log('Fetching agents from Perplexity API...');
        await callPerplexityAPI('list_agents_query'); // Example query
        
        const fetchedAgents = [
          { id: 'pplx-1', name: 'Perplexity Research' },
          { id: 'pplx-2', name: 'Perplexity Writing' },
          { id: 'pplx-3', name: 'Perplexity Analysis' },
        ];
        setAgents(fetchedAgents);
        console.log('Agents fetched and set in store.');
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, [setAgents]);

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h3 className="text-lg font-bold mb-4">Agents</h3>
      <ul>
        {agents.map((agent) => (
          <li
            key={agent.id}
            className={`p-2 cursor-pointer rounded ${
              selectedAgentId === agent.id ? 'bg-gray-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => selectAgent(agent.id)}
          >
            {agent.name}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Sidebar;
