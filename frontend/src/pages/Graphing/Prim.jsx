import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function Prim() {
    return (
        <div className="algorithm-container">
            <h1>Prim's Algorithm</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Builds a Minimum Spanning Tree by starting with one vertex and repeatedly 
                    adding the smallest edge that connects the tree to a new vertex.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`start with one vertex\n
while not all vertices in MST:\n
    pick the minimum weight edge\n
    that connects tree to new vertex\n
    add vertex and edge to MST`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="prim" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Used in designing network layouts, like cables or pipelines, 
                            where minimum cost spanning is required.
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
                    <AlgorithmCard title="Kruskal's Algorithm" description="Builds MST by adding edges in order of increasing weight." difficulty="Medium" linkTo="/graph/kruskal" />
                    <AlgorithmCard title="Dijkstra's Algorithm" description="Finds shortest paths from a source node to all others." difficulty="Medium" linkTo="/graph/dijkstra" />
                    <AlgorithmCard title="Floyd-Warshall" description="Finds shortest paths between all pairs of vertices." difficulty="Hard" linkTo="/graph/floydwarshall" />
                </div>
            </div>
        </div>
    );
}