import Navbar from "./Navbar";
import TriangleBackground from "../components/TriangleBackground";
import "../components/TriangleBackground.css";
import { useState, useEffect} from "react";

export default function Layout({ children }) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
            <div
                className="triangle-parallax"
                style={{ transform: `translateY(${offsetY * 0.2}px)` }}
            >
                <TriangleBackground />
            </div>
            <Navbar />
            <main style={{ flex: 1}} >
                {children}
            </main>
        </div>
    );
}