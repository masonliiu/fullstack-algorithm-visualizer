import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function BubbleSort() {
    return (
        <div className="algorithm-container">
            <h1>Bubble Sort</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                    Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                        <span>for each item i in the list:</span>{"\n\n"}
                        <span>&nbsp;&nbsp;if item[i] is greater than item[i+1]:</span>{"\n\n"}
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;swap item[i] and item[i+1]</span>
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="bubble" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                            Bubble sort is typically used for teaching purposes.
                            It is rarely used in production, but good for understanding sorting basics.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n) means linear growth — the time grows directly with the size of the list.">
                                Best: O(n)
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
                                data-tooltip="O(n²) in the worst case means every item must be compared and swapped, very inefficient for large lists.">
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
                        title="Insertion Sort"
                        description="Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot."
                        difficulty="Easy"
                        linkTo="/sorting/insertion"
                    />
                    <AlgorithmCard
                        title="Selection Sort"
                        description="Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted."
                        difficulty="Easy"
                        linkTo="/sorting/selection"
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