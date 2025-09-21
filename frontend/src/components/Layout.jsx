import Navbar from "./Navbar";
import TriangleBackground from "../components/TriangleBackground";
import "../components/TriangleBackground.css";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const [offsetY, setOffsetY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
            {location.pathname === "/" && (
                <div
                    className="triangle-parallax"
                    style={{ transform: `translateY(${offsetY * -0.9}px)` }}
                >
                    <TriangleBackground />
                </div>
            )}
            <Navbar />
            <main style={{ flex: 1}} >
                {children}
            </main>
        </div>
    );
}