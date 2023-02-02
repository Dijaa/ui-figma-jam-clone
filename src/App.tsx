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

const NODE_TYPES = {
  square: Square,
};
const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: { x: 250, y: 250 },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: { x: 850, y: 250 },
    data: {},
  },
] satisfies Node[]; // TODO: Add initial nodes

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES); // TODO: Add initial nodes
  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  return (
    <div className="w-screem h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
