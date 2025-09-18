import Visualizer from "../../components/Visualizer";

export default function BubbleSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Bubble Sort</h1>
            <p>Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value.</p>

            <Visualizer algo ="bubble" />
        </div>
    );
}