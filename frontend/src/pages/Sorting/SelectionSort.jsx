import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function SelectionSort() {
    return (
        <div className="algorithm-container">
            <h1>Selection Sort</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                    {`for each position i in the list:\n
    find the smallest 
    item in the unsorted 
    part\n
    swap the smallest 
    item with the item 
    at position i`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="insertion" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                        Mainly used to introduce sorting algorithms.
                        It works well for very small datasets and is helpful when minimizing the number of swaps is more important than minimizing comparisons.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n²) means quadratic growth — the number of steps increases rapidly, making it much slower for large inputs.">
                                Best: O(n²)
                            </span>
                            </li>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n²) means quadratic growth — the number of steps increases rapidly, making it much slower for large inputs.">
                                Average: O(n²)
                            </span>
                            </li>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n²) in the worst case means every item must be compared and swapped: very inefficient for large lists.">
                                Worst: O(n²)
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relatedAlgorithms">
                <h2>More Sorting Algorithms</h2>
                <div className="card-grid" style={{ gap: "120px"}}>
                        <AlgorithmCard
                            title="Bubble Sort"
                            description="Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list."
                            difficulty="Easy"
                            linkTo="/sorting/bubble"
                        />
                        <AlgorithmCard
                            title="Insertion Sort"
                            description="Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot."
                            difficulty="Easy"
                            linkTo="/sorting/insertion"
                        />
                        <AlgorithmCard
                            title="Merge Sort"
                            description="Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted."
                            difficulty="Medium"
                            linkTo="/sorting/merge"
                        />
                </div>
            </div>
        </div>
    );
}