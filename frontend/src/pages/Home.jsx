import AlgorithmCard from "../components/AlgorithmCard";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h2 className="home-title">Sorting</h2>
            <div className="card-grid">
                <AlgorithmCard
                    title="Bubble Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/bubble"
                />
                <AlgorithmCard
                    title="Insertion Sort"
                    description="Simple algorithm that loops through an array repeatedly, comparing and swapping adjacent elements depending on value."
                    difficulty="Easy"
                    linkTo="sorting/insertion"
                />
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