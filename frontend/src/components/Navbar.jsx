import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            background: "#1a1a1a",
            color: "white"
        }}>
            <h2>
                <Link to="/" style={{ marginRight: "1rem", color: "white", textDecoration: "none"}}>
                Algorithm Visualizer
                </Link>
            </h2>
            <div>
                <Link to="/" style={{ marginRight: "1rem", color: "white", textDecoration: "none"}}>
                Home 
                </Link>
                <Link to="/sorting/bubble" style={{ marginRight: "1rem", color: "white", textDecoration: "none"}}>
                Bubble Sort 
                </Link>
                <Link to="/sorting/insertion" style={{ marginRight: "1rem", color: "white", textDecoration: "none"}}>
                Insertion Sort 
                </Link>
                <Link to="/sorting/selection" style={{ marginRight: "1rem", color: "white", textDecoration: "none"}}>
                Selection Sort 
                </Link>
            </div>
        </nav>
    )
}