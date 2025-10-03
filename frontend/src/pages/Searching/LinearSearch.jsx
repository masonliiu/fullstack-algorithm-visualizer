import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function LinearSearch() {
    return (
        <div className="algorithm-container">
            <h1>Linear Search</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Iterates through each element in the list until the target is found or the list ends.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`for i in 0..n-1:\n
    if arr[i] == target:\n
        return i\n
return not found`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="linearsearch" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Best for small or unsorted datasets, 
                            or when the list is short and simplicity is preferred.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(1)</li>
                            <li>Average: O(n)</li>
                            <li>Worst: O(n)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Binary Search" description="Efficient searching in sorted arrays." difficulty="Easy" linkTo="/searching/binary" />
                </div>
            </div>
        </div>
    );
}