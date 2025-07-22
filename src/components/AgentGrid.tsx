import React from 'react';
import useGraphStore from '../store/useGraphStore';

const AgentGrid: React.FC = () => {
  const agents = useGraphStore((state) => state.agents);
  const selectAgent = useGraphStore((state) => state.selectAgent);

  const handleAgentClick = (agentId: string) => {
    selectAgent(agentId);
  };

  return (
    <div className="flex flex-wrap gap-4 overflow-auto flex-1 relative">
      {agents.map(agent => (
        <div
          key={agent.id}
          className="bg-[#2a2a2a] rounded-md shadow-inner p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer panel-clickable flex flex-col"
          tabIndex={0}
          role="button"
          aria-label={`Agent card for ${agent.name}`}
          onClick={() => handleAgentClick(agent.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAgentClick(agent.id);
            }
          }}
        >
          <div className="flex items-center mb-2">
            <span
              className={
                'inline-block w-3 h-3 rounded-full mr-2 ' +
                (agent.status === 'online'
                  ? 'bg-green-500 glow-green'
                  : agent.status === 'degraded'
                  ? 'bg-yellow-500 glow-yellow'
                  : agent.status === 'offline'
                  ? 'bg-red-600 glow-red'
                  : 'bg-gray-500')
              }
              title={agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            />
            <h3 className="text-lg font-semibold truncate">{agent.name}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-1">Type: {agent.type}</p>
          <p className="text-gray-400 text-sm mb-1 font-mono">Uptime: {formatUptime(agent.uptime)}</p>
          <p className="text-gray-400 text-sm mb-1 font-mono">Load: {agent.load}%</p>
          <p className="text-gray-400 text-sm font-mono">CPU: {agent.cpu}% | Mem: {agent.memory}% | Latency: {agent.latency}ms</p>
        </div>
      ))}
    </div>
  );
};

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export default AgentGrid;
