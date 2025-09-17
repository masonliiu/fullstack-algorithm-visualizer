import {Link} from "react-router-dom";
import { useState } from "react";

export default function AlgorithmCard({title, description, difficulty, linkTo}) {
    const color = difficulty === "Easy" ? "green" : difficulty === "Medium" ? "yellow" : "red";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={linkTo}
            style={{ textDecoration: "none"}}
        >
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                background: "#0d1a2e",
                padding: "16px",
                borderRadius: "12px",
                color: "white",
                maxWidth: "280px",
                boxShadow: isHovered ? "0 8px 16px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                transform: isHovered ? "translateY(-4px)" : "none",
                }}
            >
                <h3>{title}</h3>
                <p style={{ fontSize: "14px", opacity: 0.8}}>{description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <span style={{
                        disply: "inline-block",
                        padding: "4px",
                        background: color,
                        borderRadius: "6px",
                        fontSize: "12px",
                    }}>
                        {difficulty}
                    </span>
                    <p style={{ fontSize: "14px", margin: 0}}>{"Visualize →"}</p>
                    </div>
            </div>
        </Link>
    );
}