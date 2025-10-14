import AlgorithmCard from "../components/AlgorithmCard";
import "./Home.css";
import { useEffect, useState } from "react";

export default function Home() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const phrases = [
        "sorting algorithms",
        "graphing algorithms",
        "pathfinding algorithms",
        "sorting algorithms"
    ]
    const scrollToCards = () => {
        const grid = document.querySelector(".card-grid");
        if (grid) {
            grid.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const sections = document.querySelectorAll(".sorting-section, .searching-section, .graph-section, .pathfinding-section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        entry.target.classList.remove("hidden");
                    } else {
                        entry.target.classList.add("hidden");
                        entry.target.classList.remove("visible");
                    }
                })
            },
            { threshold: 0.6 }
        );
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Algorithm Visualizer</h1>
                <p className="hero-tagline">
                    Learn {" "}
                    <span className="hero-cycle"> 
                        <span className="hero-cycle-inner">
                            {phrases.map((p, i) => (
                                <span key={i}>{p}</span>
                            ))}
                        </span>
                    </span>{" "}
                    step by step through interactive animations.
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
                        description="Divides the array into halves, sorts each half, and then merges the sorted halves back together."
                        difficulty="Medium"
                        linkTo="sorting/merge"
                    />
                    <AlgorithmCard
                        title="Quick Sort"
                        description="Selects a pivot element and partitions the array around the pivot, recursively sorting the partitions."
                        difficulty="Medium"
                        linkTo="sorting/quick"
                    />
                    <AlgorithmCard
                        title="Heap Sort"
                        description="Builds a heap from the array and repeatedly extracts the maximum element to sort the array."
                        difficulty="Medium"
                        linkTo="sorting/heap"
                    />
                </div>
            </div>
            <div className="searching-section hidden">
                <h2 className="home-title">Searching</h2>
                <div className="card-grid">
                    <AlgorithmCard
                        title="Linear Search"
                        description="Checks each element in the list sequentially until the target value is found or the list ends."
                        difficulty="Easy"
                        linkTo="searching/linear"
                    />
                    <AlgorithmCard
                        title="Binary Search"
                        description="Efficiently searches a sorted list by repeatedly dividing the search interval in half."
                        difficulty="Easy"
                        linkTo="searching/binary"
                    />
                </div>
            </div>
            <div className="graph-section hidden">
                <h2 className="home-title">Graph Algorithms</h2>
                <div className="card-grid">
                    <AlgorithmCard
                        title="Dijkstra's Algorithm"
                        description="Finds the shortest path between nodes in a graph, which may represent road networks."
                        difficulty="Medium"
                        linkTo="graph/dijkstra"
                    />
                    <AlgorithmCard
                        title="Kruskal's Algorithm"
                        description="Finds a minimum spanning tree for a connected weighted graph by adding edges in increasing order of weight."
                        difficulty="Medium"
                        linkTo="graph/kruskal"
                    />
                    <AlgorithmCard
                        title="Prim's Algorithm"
                        description="Finds a minimum spanning tree by growing the spanning tree one edge at a time, choosing the smallest edge that connects the tree to a new vertex."
                        difficulty="Medium"
                        linkTo="graph/prim"
                    />
                </div>
            </div>
            <div className="pathfinding-section hidden">
                <h2 className="home-title">Pathfinding</h2>
                <div className="card-grid">
                    <AlgorithmCard
                        title="BFS"
                        description="Explores nodes level by level, useful for finding the shortest path in unweighted graphs."
                        difficulty="Easy"
                        linkTo="pathfinding/bfs"
                    />
                    <AlgorithmCard
                        title="DFS"
                        description="Explores as far as possible along each branch before backtracking."
                        difficulty="Easy"
                        linkTo="pathfinding/dfs"
                    />
                    <AlgorithmCard
                        title="A* Search"
                        description="Uses heuristics to efficiently find the shortest path between nodes."
                        difficulty="Medium"
                        linkTo="pathfinding/astar"
                    />
                </div>
            </div>
        </div>
    );
}