import { Link } from "react-router-dom";
import { useState } from "react";
import "./AlgorithmCard.css";

export default function AlgorithmCard({ title, description, difficulty, linkTo }) {
    const colorClass = difficulty === "Easy" ? "easy" : difficulty === "Medium" ? "medium" : "hard";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={linkTo} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div 
                className={`algorithm-card ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h3>{title}</h3>
                <p className="description">{description}</p>
                <div className="card-footer">
                    <span className={`difficulty ${colorClass}`}>
                        {difficulty}
                    </span>
                    <p className="visualize">{"Visualize →"}</p>
                </div>
            </div>
        </Link>
    );
}