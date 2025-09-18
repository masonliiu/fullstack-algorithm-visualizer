import AlgorithmCard from "../components/AlgorithmCard";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h2 className="home-title">Sorting</h2>
            <div className="card-grid">
                <AlgorithmCard
                    title="Bubble Sort"
                    description="Repeatedly compares adjacent elements based on value, swapping them until the largest items “bubble up” to the end of the list."
                    difficulty="Easy"
                    linkTo="sorting/bubble"
                />
                <AlgorithmCard
                    title="Insertion Sort"
                    description="Goes through the list one item at a time, shifting the current item backwards if the previous one is larger, and so on until it’s in the right spot."
                    difficulty="Easy"
                    linkTo="sorting/insertion"
                />
                <AlgorithmCard
                    title="Selection Sort"
                    description="Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted."
                    difficulty="Easy"
                    linkTo="sorting/selection"
                />
            </div>
        </div>
    );
}