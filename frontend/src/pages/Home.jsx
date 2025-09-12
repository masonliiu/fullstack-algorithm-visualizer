import AlgorithmCard from "../components/AlgorithmCard";

export default function Home() {
    return (
        <div style={{padding: "32px", background: "#0f1220", minHeight: "100vh", color: "white"}}>
            <h1>Algorithm Visualizer</h1>
            <p>Select an Algorithm to see how it works:</p>

            <h2 style={{marginTop: "24px"}}>Sorting</h2>
            <div style={{display: "flex", gap: "16px", flexwrap: "wrap"}}>
                <AlgorithmCard
                    title="Bubble Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/Bubble"
                />
            </div>
        </div>

    );
}