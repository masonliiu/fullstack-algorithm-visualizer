import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function BFS() {
    return (
        <div className="algorithm-container">
            <h1>Breadth-First Search (BFS)</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Explores a graph or tree level by level, visiting all neighbors before moving deeper.
                    Guarantees the shortest path in unweighted graphs.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`enqueue(start)\n
while queue not empty:\n
    node = dequeue()\n
    visit(node)\n
    enqueue(all unvisited neighbors)`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="bfs" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Used in shortest path finding in unweighted graphs,
                            web crawlers, and peer-to-peer networks.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(V + E)</li>
                            <li>Average: O(V + E)</li>
                            <li>Worst: O(V + E)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="DFS" description="Explores as far as possible along a branch before backtracking." difficulty="Easy" linkTo="/pathfinding/dfs" />
                    <AlgorithmCard title="Dijkstra's Algorithm" description="Shortest path in weighted graphs." difficulty="Medium" linkTo="/graph/dijkstra" />
                </div>
            </div>
        </div>
    );
}