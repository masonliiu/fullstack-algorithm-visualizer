import AlgorithmCard from "../components/AlgorithmCard";
import "./Home.css";
import { useEffect } from "react";

export default function Home() {
    const scrollToCards = () => {
        const grid = document.querySelector(".card-grid");
        if (grid) {
            grid.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const sortingSection = document.querySelector(".sorting-section");
        if (!sortingSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sortingSection.classList.add("visible");
                    sortingSection.classList.remove("hidden");
                } else {
                    sortingSection.classList.remove("visible");
                    sortingSection.classList.add("hidden");
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(sortingSection);

        return () => {
            if (sortingSection) observer.unobserve(sortingSection);
        };
    }, []);
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Algorithm Visualizer</h1>
                <p className="hero-tagline">
                    Learn sorting algorithms step by step through interactive animations.
                </p>
                <button className="hero-button" onClick={scrollToCards}>
                    Get Started ↓
                </button>
            </div>
            <div className="sorting-section hidden">
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
                    <AlgorithmCard
                        title="Merge Sort"
                        description="Looks through the array to find the smallest value, then swaps it into the first position. Then it finds the next smallest and swaps it into the second position, and so on until sorted."
                        difficulty="Medium"
                        linkTo="sorting/merge"
                    />
                </div>
            </div>
        </div>
    );
}