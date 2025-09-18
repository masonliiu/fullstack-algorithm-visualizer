import Visualizer from "../../components/Visualizer";

export default function MergeSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Merge Sort</h1>
            <p>Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list.</p>
            <Visualizer algo ="merge" />
        </div>
    );
}