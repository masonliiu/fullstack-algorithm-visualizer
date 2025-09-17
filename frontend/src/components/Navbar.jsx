import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-link">Home</Link>
            </div>
            <h2 className="navbar-logo">
                <Link to="/" className="navbar-link">
                    Algorithm Visualizer
                </Link>
            </h2>
            <div className="navbar-socials">
                <a 
                    href="https://github.com/masonliiu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://linkedin.com/in/masonliiu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://instagram.com/mason_liuu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <FaInstagram />
                </a>
            </div>
        </nav>
    );
}