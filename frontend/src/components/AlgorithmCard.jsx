import {Link} from "react-router-dom";

export default function AlgorithmCard({title, description, difficulty, linkTo}) {
    const color = difficulty === "Easy" ? "green" : difficulty === "Medium" ? "yellow" : "red";

    return (
        <div style={{
            background: "#181a2b",
            padding: "16px",
            borderRadius: "12px",
            color: "white",
            maxWidth: "280px"
        }}>
            <h3>{title}</h3>
            <p style={{ fontSize: "14px", opacity: 0.8}}>{description}</p>
            <span style={{
                disply: "inline-block",
                padding: "4px, 8px",
                background: color,
                borderRadius: "6px",
                fontSize: "12px",
                marginTop: "8px"
            }}>
                {difficulty}
            </span>
            <div style={{ marginTop: "12px"}}>
                <Link
                    to={linkTo}
                    style={{
                        background: "#3b82f6",
                        color: "white",
                        padding: "8px, 12px",
                        borderRadius: "8px",
                        textDecoration: "none"
                    }}
                >
                    Visualize →
                </Link>
            </div>
        </div>
    );
}