import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/nodes/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefaultEdge";
import * as ToolBar from '@radix-ui/react-toolbar'

const NODE_TYPES = {
  square: Square,
};
const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: { x: 200, y: 400 },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: { x: 1000, y: 400 },
    data: {},
  },
] satisfies Node[]; // TODO: Add initial nodes

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES); // TODO: Add initial nodes
  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: { x: 750, y: 350 },
        data: {},
      },
    ])
  }

  return (
    <div className="w-screem h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>
      <ToolBar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <ToolBar.Button
          onClick={addSquareNode}
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-3" />
      </ToolBar.Root>
    </div>
  );
}

export default App;
