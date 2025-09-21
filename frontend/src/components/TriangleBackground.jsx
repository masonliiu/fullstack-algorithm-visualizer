import { useEffect } from "react";

export default function TriangleBackground() {
  useEffect(() => {
    const container = document.querySelector(".triangle-container");

    const createTriangle = () => {
      const triangle = document.createElement("div");
      triangle.className = "triangle";
      const size = 10 + Math.random() * 25 //size
      triangle.style.borderLeft = `${size}px solid transparent`;
      triangle.style.borderRight = `${size}px solid transparent`;
      triangle.style.borderBottom = `${size * 1.5}px solid`;

      const opacity = 0.05 + Math.random() * 0.7; //opacity
      triangle.style.borderBottomColor = `rgba(255, 255, 255, ${opacity})`;

      


      triangle.style.left = `${Math.random() * 100}vw`;
      triangle.style.animationDuration = `${4 + Math.random() * 4}s`;

      const scale = 0.9 + Math.random() * 1.5;
      const rotation = (Math.random() * 20) - 10;
      triangle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

      container.appendChild(triangle);

      triangle.addEventListener("animationend", () => {
        triangle.remove();
      });
    };

    const interval = setInterval(createTriangle, 100); //change spawn rate
    return () => clearInterval(interval);
  }, []);

  return <div className="triangle-container"></div>;
}