import Visualizer from "../../components/Visualizer";

export default function InsertionSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Insertion Sort</h1>
            <p>Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value.</p>

            <Visualizer algo ="insertion" />
        </div>
    );
}