import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function BinarySearch() {
    return (
        <div className="algorithm-container">
            <h1>Binary Search</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Efficiently searches a sorted array by repeatedly dividing the search interval in half.
                </p>
            </div>

            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`low = 0, high = n-1\n
while low <= high:\n
    mid = (low + high) / 2\n
    if arr[mid] == target: return mid\n
    else if arr[mid] < target: low = mid+1\n
    else: high = mid-1`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="binarysearch" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Widely used in libraries, databases, and searching sorted data structures.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>Best: O(1)</li>
                            <li>Average: O(log n)</li>
                            <li>Worst: O(log n)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relatedAlgorithms">
                <h2>Related Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Linear Search" description="Checks each element until target is found." difficulty="Easy" linkTo="/searching/linear" />
                </div>
            </div>
        </div>
    );
}