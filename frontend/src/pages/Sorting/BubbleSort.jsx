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
                    {`for each item i in the list:
                            if item[i] is greater than item[i+1]:
                                swap item[i] and item[i+1]`}
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
                            <li>Best: O(n)</li>
                            <li>Average: O(n²)</li>
                            <li>Worst: O(n²)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relatedAlgorithms">
                <h2>More Sorting Algorithms</h2>
                <div className="card-grid" style={{ gap: "16px"}}>
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