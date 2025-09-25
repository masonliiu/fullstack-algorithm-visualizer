import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";

export default function InsertionSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Insertion Sort</h1>
            <p>Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot.</p>
            <Visualizer algo ="insertion" />

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