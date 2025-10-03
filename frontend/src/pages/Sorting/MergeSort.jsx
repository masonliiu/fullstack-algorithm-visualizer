import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";
import "../../styles/AlgorithmLayout.css";

export default function MergeSort() {
    return (
        <div className="algorithm-container">
            <h1>Merge Sort</h1>

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
                    {`if the list has 1 or fewer items:\n
    mark as already 
    sorted\n
else:\n 
    split the list into 
    two halves\n
    recursively sort
    each half\n
    merge the two sorted 
    halves into one list`}
                    </pre>
                </div>
                <div className="visualizer-wrapper">
                    <Visualizer algo="merge" />
                </div>
                <div className="card-stack">
                    <div className="card use-cases-card">
                        <h2>Use Cases</h2>
                        <p>
                        Merge sort is often used for large datasets because of its consistent efficiency. 
                        It is the basis of many real-world sorting libraries and is especially effective for linked lists and data that's too large to fit into memory at once.
                        </p>
                    </div>

                    <div className="card">
                        <h2>Complexity</h2>
                        <ul>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n log n) means near-linear growth — it scales efficiently, often seen in fast sorting algorithms like Merge Sort and Quick Sort.">
                                Best: O(n log n)
                            </span>
                            </li>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n log n) means near-linear growth — it scales efficiently, often seen in fast sorting algorithms like Merge Sort and Quick Sort.">
                                Average: O(n log n)
                            </span>
                            </li>
                            <li>
                            <span 
                                className="tooltip" 
                                data-tooltip="O(n log n) means near-linear growth — it scales efficiently, often seen in fast sorting algorithms like Merge Sort and Quick Sort.">
                                Worst: O(n log n)
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
                            title="Selection Sort"
                            description="Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted."
                            difficulty="Easy"
                            linkTo="/sorting/selection"
                        />
                </div>
            </div>
        </div>
    );
}