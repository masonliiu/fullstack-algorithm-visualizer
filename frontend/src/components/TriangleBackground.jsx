import { useEffect } from "react";

export default function TriangleBackground() {
  useEffect(() => {
    const container = document.querySelector(".triangle-container");

    const createTriangle = () => {
      const triangle = document.createElement("div");
      triangle.className = "triangle";
      // Random size for border to create different sized triangles
      const size = 10 + Math.random() * 15 // base size between 10px and 30px
      triangle.style.borderLeft = `${size}px solid transparent`;
      triangle.style.borderRight = `${size}px solid transparent`;
      triangle.style.borderBottom = `${size * 1.5}px solid`;

      // Random opacity for white color
      const opacity = 0.05 + Math.random() * 0.4; // opacity between 0.2 and 0.8
      triangle.style.borderBottomColor = `rgba(255, 255, 255, ${opacity})`;

      


      triangle.style.left = `${Math.random() * 100}vw`;

      triangle.style.animationDuration = `${4 + Math.random() * 4}s`;

      // Random scale and slight rotation
      const scale = 0.9 + Math.random() * 1.5;
      const rotation = (Math.random() * 20) - 10; // rotate between -10deg and 10deg
      triangle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

      container.appendChild(triangle);

      triangle.addEventListener("animationend", () => {
        triangle.remove();
      });
    };

    const interval = setInterval(createTriangle, 500); //change spawn rate
    return () => clearInterval(interval);
  }, []);

  return <div className="triangle-container"></div>;
}