import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function AStar() {
    return (
        <div className="algorithm-container">
            <h1>A* Search</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    A* is a pathfinding algorithm that combines the actual cost to reach a node (g) and a heuristic estimate to the goal (h). 
                    It expands nodes with the lowest total cost f = g + h, ensuring both efficiency and optimality when the heuristic is admissible.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`openSet = {start}\n
g[start] = 0\n
f[start] = h(start)\n
while openSet not empty:\n
    current = node in openSet with lowest f\n
    if current == goal: return path\n
    remove current from openSet\n
    for each neighbor of current:\n
        tentative_g = g[current] + dist(current, neighbor)\n
        if tentative_g < g[neighbor]:\n
            cameFrom[neighbor] = current\n
            g[neighbor] = tentative_g\n
            f[neighbor] = g[neighbor] + h(neighbor)\n
            if neighbor not in openSet:\n
                add neighbor to openSet`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="astar" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Widely used in navigation systems, robotics, video games, and AI for finding the shortest or most efficient path.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>
                                <span 
                                    className="tooltip" 
                                    data-tooltip="Best case: direct straight path with low branching.">
                                    Best: O(n)
                                </span>
                            </li>
                            <li>
                                <span 
                                    className="tooltip" 
                                    data-tooltip="On average, A* explores fewer nodes than BFS or Dijkstra by using heuristics.">
                                    Average: O(E)
                                </span>
                            </li>
                            <li>
                                <span 
                                    className="tooltip" 
                                    data-tooltip="Worst case: if heuristic is poor, A* can degrade to Dijkstra’s complexity.">
                                    Worst: O(E + V log V)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relatedAlgorithms">
                <h2>More Pathfinding Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard
                        title="Dijkstra's Algorithm"
                        description="Finds shortest paths by exploring nodes in order of cumulative distance."
                        difficulty="Medium"
                        linkTo="/graph/dijkstra"
                    />
                    <AlgorithmCard
                        title="Breadth-First Search (BFS)"
                        description="Explores equally in all directions layer by layer until the goal is found."
                        difficulty="Easy"
                        linkTo="/pathfinding/bfs"
                    />
                    <AlgorithmCard
                        title="Depth-First Search (DFS)"
                        description="Explores paths deeply before backtracking; not guaranteed shortest path."
                        difficulty="Easy"
                        linkTo="/pathfinding/dfs"
                    />
                </div>
            </div>
        </div>
    );
}