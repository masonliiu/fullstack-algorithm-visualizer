import Visualizer from "../../components/Visualizer";
import AlgorithmCard from "../../components/AlgorithmCard";

export default function MergeSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Merge Sort</h1>
            <p>Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list.</p>
            <Visualizer algo ="merge" />
            <div className="card-grid" style={{ gap: "16px"}}>
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
    );
}