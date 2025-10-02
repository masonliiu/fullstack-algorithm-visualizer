import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function InsertionSort() {
    return (
        <div className="algorithm-container">
            <h1>Insertion Sort</h1>

            <div className="card concept-card">
                <h2>Concept</h2>
                <p>
                Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot.
                </p>
            </div>
            <div className="algorithm-grid">
                <div className="card pseudocode-card">
                    <h2>Pseudocode</h2>
                    <pre>
                    {`for each item i from the second item to the end of the list:
                    set current = item at i
                    set j = i - 1
                    while j >= 0 and item[j] > current:
                        shift item[j] one position to the right
                        j = j - 1
                    place current at position j + 1`}
                    </pre>
                </div>

                <div className="visualizer-wrapper">
                    <Visualizer algo="insertion" />
                </div>

                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                        Insertion sort is useful when dealing with small datasets or lists that are already mostly sorted. 
                        It is simple to implement and mainly used for teaching sorting fundamentals.
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
                        title="Bubble Sort"
                        description="Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list."
                        difficulty="Easy"
                        linkTo="/sorting/bubble"
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