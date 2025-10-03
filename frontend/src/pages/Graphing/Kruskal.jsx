import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function Kruskal() {
    return (
        <div className="algorithm-container">
            <h1>Kruskal's Algorithm</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Finds a Minimum Spanning Tree by sorting edges by weight 
                    and adding them one by one while avoiding cycles.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`sort all edges by weight\n
for each edge (u, v):\n
    if u and v are not connected:\n
        add edge to MST\n
        union(u, v)`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="kruskal" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Used in designing networks and clustering, 
                            where cycle prevention is important.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(E log V)</li>
                            <li>Average: O(E log V)</li>
                            <li>Worst: O(E log V)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Prim's Algorithm" description="Builds MST by expanding edges from a vertex." difficulty="Medium" linkTo="/graph/prim" />
                    <AlgorithmCard title="Dijkstra's Algorithm" description="Shortest path in weighted graphs." difficulty="Medium" linkTo="/graph/dijkstra" />
                </div>
            </div>
        </div>
    );
}