import Visualizer from "../../components/Visualizer";

export default function SelectionSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Selection Sort</h1>
            <p>Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted.</p>

            <Visualizer algo="selection" />
        </div>
    );
}