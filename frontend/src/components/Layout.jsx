import Navbar from "./Navbar";
import TriangleBackground from "../components/TriangleBackground";
import "../components/TriangleBackground.css";

export default function Layout({ children }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <TriangleBackground />
            <Navbar />
            <main style={{ flex: 1}}>{children}</main>
        </div>
    );
}