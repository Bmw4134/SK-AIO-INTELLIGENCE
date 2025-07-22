import React from 'react';
import useGraphStore from '../store/useGraphStore';

const GraphCanvas: React.FC = () => {
  const nodes = useGraphStore((state) => state.graph.nodes);
  const setSelectedNode = useGraphStore((state) => state.setSelectedNode);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node.id);
  };

  return (
    <section className="flex-1 bg-gray-800 p-6 overflow-auto shadow-inner">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Graph Canvas</h3>
      <div className="flex flex-col gap-3">
        {nodes.map(node => (
          <div 
            key={node.id} 
            className="p-3 bg-gray-700 border border-gray-600 rounded cursor-pointer text-gray-200 hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={() => handleNodeClick(node)}
            tabIndex={0}
            role="button"
            aria-pressed="false"
          >
            {node.data.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GraphCanvas;
