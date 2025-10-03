import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function DFS() {
    return (
        <div className="algorithm-container">
            <h1>Depth-First Search (DFS)</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Explores as far down a branch as possible before backtracking.
                    Can be implemented using recursion or a stack.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`dfs(node):\n
    mark node visited\n
    for each neighbor:\n
        if not visited:\n
            dfs(neighbor)`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="dfs" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Useful for pathfinding, cycle detection, topological sorting,
                            and exploring connected components in graphs.
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
                    <AlgorithmCard title="BFS" description="Explores level by level, ensuring shortest paths in unweighted graphs." difficulty="Easy" linkTo="/pathfinding/bfs" />
                    <AlgorithmCard title="Topological Sort" description="Orders vertices in a directed acyclic graph." difficulty="Medium" linkTo="/graph/topological" />
                </div>
            </div>
        </div>
    );
}