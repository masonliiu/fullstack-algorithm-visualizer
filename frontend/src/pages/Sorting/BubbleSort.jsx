import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";

export default function BubbleSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Bubble Sort</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "40px"
            }}>
                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "12px"}}>
                    <h2>Concept</h2>
                    <p>
                        Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list.
                    </p>
                </div>

                <div style={{
                    background: "rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "12px"
                }}>
                    <h2>Pseudocode</h2>
                    <pre style={{ whiteSpace: "pre-wrap"}}>
                        {`for i from 0 to n-1:
                            for j from 0 to n-i-1:
                            if arr`}
                    </pre>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "12px"}}>
                    <h2>Complexity</h2>
                    <ul>
                        <li>Best: O(n)</li>
                        <li>Average: O(n²)</li>
                        <li>Worst: O(n²)</li>
                    </ul>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "12px"}}>
                    <h2>Use Cases</h2>
                    <p>
                        Bubble sort is typically used for teaching purposes.
                        It is rarely used in production, but good for understanding sorting basics.
                    </p>
                </div>
            </div>

            <Visualizer algo ="bubble" />

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