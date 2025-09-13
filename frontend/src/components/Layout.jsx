import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <Navbar />
            <main style={{ flex: 1}}>{children}</main>
        </div>
    );
}