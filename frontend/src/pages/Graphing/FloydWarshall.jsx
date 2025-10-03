import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function FloydWarshall() {
    return (
        <div className="algorithm-container">
            <h1>Floyd-Warshall</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    A dynamic programming algorithm that computes shortest paths 
                    between all pairs of vertices in a weighted graph.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`for k in vertices:\n
    for i in vertices:\n
        for j in vertices:\n
            if dist[i][k] + dist[k][j] < dist[i][j]:\n
                dist[i][j] = dist[i][k] + dist[k][j]`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="floydwarshall" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Network routing, analyzing connectivity in weighted graphs, 
                            and all-pairs shortest paths problems.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(V³)</li>
                            <li>Average: O(V³)</li>
                            <li>Worst: O(V³)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Dijkstra's Algorithm" description="Single-source shortest path." difficulty="Medium" linkTo="/graph/dijkstra" />
                    <AlgorithmCard title="Kruskal's Algorithm" description="Minimum spanning tree via edges." difficulty="Medium" linkTo="/graph/kruskal" />
                </div>
            </div>
        </div>
    );
}