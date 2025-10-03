import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function QuickSort() {
    return (
        <div className="algorithm-container">
            <h1>Quick Sort</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Picks a pivot, partitions the list into two sublists (less than and greater than pivot), and recursively sorts the sublists.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        {`if list has more than one element:\n
    choose a pivot\n
    partition list into < pivot and > pivot\n
    recursively quick sort the sublists\n
    combine results`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="quick" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Commonly used in practice due to excellent average performance.
                            Used in standard libraries and for general-purpose sorting.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li><span className="tooltip" data-tooltip="Best occurs when partitions are balanced.">Best: O(n log n)</span></li>
                            <li><span className="tooltip" data-tooltip="Average partitions tend to be balanced enough.">Average: O(n log n)</span></li>
                            <li><span className="tooltip" data-tooltip="Worst case is when partitions are uneven (e.g., already sorted).">Worst: O(n²)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relatedAlgorithms">
                <h2>More Sorting Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                    <AlgorithmCard title="Merge Sort" description="Divide and conquer with merging sublists." difficulty="Medium" linkTo="/sorting/merge" />
                    <AlgorithmCard title="Heap Sort" description="Uses heap structure to sort efficiently." difficulty="Medium" linkTo="/sorting/heap" />
                    <AlgorithmCard title="Selection Sort" description="Repeatedly selects the smallest item." difficulty="Easy" linkTo="/sorting/selection" />
                </div>
            </div>
        </div>
    );
}