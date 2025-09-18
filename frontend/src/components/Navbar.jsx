import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-logo">
                <Link to="/" className="navbar-link">Algorithm Visualizer</Link>
            </div>

            <div className="navbar-center">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/sorting/bubble" className="navbar-link">Bubble Sort</Link>
                <Link to="/sorting/insertion" className="navbar-link">Insertion Sort</Link>
                <Link to="/sorting/selection" className="navbar-link">Selection Sort</Link>
                <Link to="/sorting/merge" className="navbar-link">Merge Sort</Link>
            </div>

            <div className="navbar-socials">
                <a 
                    href="https://github.com/masonliiu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link github"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://linkedin.com/in/masonliiu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://instagram.com/mason_liuu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link instagram"
                >
                    <FaInstagram />
                </a>
            </div>
        </nav>
    );
}