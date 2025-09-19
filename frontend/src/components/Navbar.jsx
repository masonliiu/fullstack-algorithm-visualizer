import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        const throttled = () => {
            requestAnimationFrame(handleScroll);
        };
        window.addEventListener("scroll", throttled);
        return () => window.removeEventListener("scroll", throttled);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-logo">
                <Link to="/" className="navbar-link">Home</Link>
            </div>

            <div className="navbar-center">
                <NavLink 
                    to="/sorting/bubble" 
                    className={({ isActive }) => 
                        "navbar-link" + (isActive ? " active" : "")
                    }
                    end
                >   
                    Bubble Sort
                </NavLink>
                <NavLink 
                    to="/sorting/insertion" 
                    className={({ isActive }) => 
                        "navbar-link" + (isActive ? " active" : "")
                    }
                    end
                >   
                    Insertion Sort
                </NavLink>
                <NavLink 
                    to="/sorting/selection" 
                    className={({ isActive }) => 
                        "navbar-link" + (isActive ? " active" : "")
                    }
                    end
                >   
                    Selection Sort
                </NavLink>
                <NavLink 
                    to="/sorting/merge" 
                    className={({ isActive }) => 
                        "navbar-link" + (isActive ? " active" : "")
                    }
                    end
                >   
                    Merge Sort
                </NavLink>
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