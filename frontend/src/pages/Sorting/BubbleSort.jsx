import Visualizer from "../../components/Visualizer";

export default function BubbleSort() {
    return (
        <div style={{ padding: "32px", background: "#0f1220", minHeight: "100vh", color: "white"}}>
            <h1>Bubble Sort</h1>
            <p>Visualization of the Bubble Sort algorithm</p>

            <Visualizer />
        </div>
    );
}