import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GraphState {
  graph: {
    nodes: any[];
    edges: any[];
    selectedNodeId: string | null;
  };
  agents: any[];
  selectedAgentId: string | null;
  events: any[];
  auditDrawerOpen: boolean;
  auditDrawerTitle: string;
  auditDrawerContent: string;
}

interface GraphActions {
  setGraph: (graph: any) => void;
  updateNode: (node: any) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setAgents: (agents: any[]) => void;
  selectAgent: (agentId: string | null) => void;
  addEvent: (event: any) => void;
  openAuditDrawer: (title: string, content: string) => void;
  closeAuditDrawer: () => void;
}



const useGraphStore = create<GraphState & GraphActions>()(
  persist(
    (set) => ({
      // Initial state
      graph: {
        nodes: [],
        edges: [],
        selectedNodeId: null
      },
      agents: [
        { id: '1', name: 'Research Agent', type: 'research' },
        { id: '2', name: 'Code Agent', type: 'code' },
        { id: '3', name: 'Analysis Agent', type: 'analysis' }
      ],
      selectedAgentId: null,
      events: [],
      auditDrawerOpen: false,
      auditDrawerTitle: '',
      auditDrawerContent: '',

      // Actions
      setGraph: (graph) => set({ graph }),
      updateNode: (node) =>
        set((state) => ({
          graph: {
            ...state.graph,
            nodes: state.graph.nodes.map((n) => (n.id === node.id ? node : n))
          }
        })),
      setSelectedNode: (nodeId) =>
        set((state) => ({
          graph: { ...state.graph, selectedNodeId: nodeId }
        })),
      setAgents: (agents) => set({ agents }),
      selectAgent: (agentId) => set({ selectedAgentId: agentId }),
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event].slice(-20) // Keep last 20 events
        })),
      openAuditDrawer: (title, content) =>
        set({ auditDrawerOpen: true, auditDrawerTitle: title, auditDrawerContent: content }),
      closeAuditDrawer: () =>
        set({ auditDrawerOpen: false, auditDrawerTitle: '', auditDrawerContent: '' }),
    }),
    {
      name: 'graph-store',
    }
  )
);

export default useGraphStore;
