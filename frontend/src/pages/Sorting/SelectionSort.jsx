import Visualizer from "../../components/Visualizer";

export default function SelectionSort() {
    return (
        <div style={{ padding: "32px", background: "#0f1220", minHeight: "100vh", color: "white"}}>
            <h1>Selection Sort</h1>
            <p>Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value.</p>

            <Visualizer algo="selection" />
        </div>
    );
}