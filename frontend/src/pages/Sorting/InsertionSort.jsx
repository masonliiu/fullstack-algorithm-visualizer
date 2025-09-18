import Visualizer from "../../components/Visualizer";

export default function InsertionSort() {
    return (
        <div style={{ padding: "32px", minHeight: "100vh", paddingTop: "130px", color: "white"}}>
            <h1>Insertion Sort</h1>
            <p>Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot.</p>
            <Visualizer algo ="insertion" />
        </div>
    );
}