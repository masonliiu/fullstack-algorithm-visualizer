import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function HeapSort() {
    return (
        <div className="algorithm-container">
            <h1>Heap Sort</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Builds a max heap from the list, repeatedly extracts the maximum element, and rebuilds the heap until all elements are sorted.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`build a max heap from the list\n
for each element from end to start:\n
    swap root with last element\n
    heapify the reduced heap`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="heap" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Useful when memory is constrained since it sorts in-place.
                            Guarantees O(n log n) worst-case runtime.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li><span className="tooltip" data-tooltip="Heapifying maintains log n per extraction.">Best: O(n log n)</span></li>
                            <li><span className="tooltip" data-tooltip="Consistently O(n log n) across inputs.">Average: O(n log n)</span></li>
                            <li><span className="tooltip" data-tooltip="Worst case is still O(n log n).">Worst: O(n log n)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relatedAlgorithms">
                <h2>More Sorting Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Quick Sort" description="Fast average case, pivot-based partitioning." difficulty="Medium" linkTo="/sorting/quick" />
                    <AlgorithmCard title="Merge Sort" description="Divide and conquer merging." difficulty="Medium" linkTo="/sorting/merge" />
                    <AlgorithmCard title="Insertion Sort" description="Efficient for small or nearly sorted data." difficulty="Easy" linkTo="/sorting/insertion" />
                </div>
            </div>
        </div>
    );
}