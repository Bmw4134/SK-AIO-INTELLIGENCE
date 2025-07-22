import React from 'react';

interface NodeEditorProps {
  selectedNode: any;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <aside className="w-72 bg-gray-800 p-6 h-screen overflow-auto shadow-inner">
        <p className="text-gray-300">Select a node to edit</p>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-gray-800 p-6 h-screen overflow-auto shadow-inner">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Node Editor</h3>
      <NodeEditorForm selectedNode={selectedNode} />
    </aside>
  );
};

const NodeEditorForm: React.FC<{ selectedNode: any }> = ({ selectedNode }) => {
  const [label, setLabel] = React.useState(selectedNode.data.label);

  const handleSave = () => {
    alert(`Saving label: ${label}`);
    // TODO: Implement save logic
  };

  const handleCancel = () => {
    
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
      <div>
        <label htmlFor="label" className="text-gray-300 mb-1 block">Label:</label>
        <input
          id="label"
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NodeEditor;
