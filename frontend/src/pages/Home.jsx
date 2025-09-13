import AlgorithmCard from "../components/AlgorithmCard";

export default function Home() {
    return (
        <div style={{display: "flex", padding: "200px", background: "#0f1220", gap: "8px", color: "white", flexWrap: "wrap"}}>

            <h2 style={{marginTop: "-40px", alignSelf: "auto"}}>Sorting</h2>
            <div style={{display: "flex", gap: "16px", flexwrap: "wrap"}}>
                <AlgorithmCard
                    title="Bubble Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/bubble"
                />
            </div>
            <div style={{display: "flex", gap: "16px", flexwrap: "wrap"}}>
                <AlgorithmCard
                    title="Insertion Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/insertion"
                />
            </div>
            <div style={{display: "flex", gap: "16px", flexwrap: "wrap"}}>
                <AlgorithmCard
                    title="Selection Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/selection"
                />
            </div>
        </div>
        

    );
}