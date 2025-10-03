import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function Dijkstra() {
    return (
        <div className="algorithm-container">
            <h1>Dijkstra's Algorithm</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Finds the shortest path from a source node to all other nodes in a weighted graph.
                    Works only with non-negative edge weights.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`set dist[source] = 0\n
for all other vertices dist = ∞\n
while unvisited nodes remain:\n
    pick node with smallest distance\n
    update distances of its neighbors`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="dijkstra" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            GPS navigation, network routing, and pathfinding in games and maps.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(E + V log V)</li>
                            <li>Average: O(E + V log V)</li>
                            <li>Worst: O(V²)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Floyd-Warshall" description="All-pairs shortest path in weighted graphs." difficulty="Hard" linkTo="/graph/floydwarshall" />
                    <AlgorithmCard title="Prim's Algorithm" description="Builds MST by growing edges from one vertex." difficulty="Medium" linkTo="/graph/prim" />
                    <AlgorithmCard title="BFS" description="Finds shortest path in unweighted graphs." difficulty="Easy" linkTo="/pathfinding/bfs" />
                </div>
            </div>
        </div>
    );
}