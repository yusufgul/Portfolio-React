import React, { useState, useRef, useEffect } from "react";
import Debounce from "../utility/Debounce";

const StarrySky = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [opacity, setOpacity] = useState(0);
  const canvasRef = useRef(null);

  // Make stars appear slowly with opacity
  useEffect(() => {
    if (opacity > 1) {
      return;
    }
    const intervalId = setInterval(() => {
      setOpacity(opacity + 0.02);
    }, 50);
    return () => clearInterval(intervalId);
  }, [opacity]);

  useEffect(() => {
    const handleResize = Debounce(() => setWidth(window.innerWidth), 250);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Create a 2D rendering context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create an empty array for circle objects
    const circles = [];
    let circleCount;
    // Create more stars for small screens because less star can be seen at small screens
    // Bigger number means less stars because we divide canvas area by that number
    if (window.innerWidth > 1024) {
      circleCount = Math.round((canvas.width * canvas.height) / (35 * 35));
    } else {
      circleCount = Math.round((canvas.width * canvas.height) / (30 * 30));
    }

    for (let i = 0; i < circleCount; i++) {
      // white color for stars - most common
      let color = "#f8f7ff";
      if (Math.random() < 0.2) {
        // Blue color for stars - second common
        color = "#9bb0ff";
      } else if (Math.random() < 0.05) {
        // Redish color for stars- least common
        color = "#ffcc6f";
      }
      // Create random twinkle speed for stars. I found this values with trial and error process
      // At bigger screens it is harder to notice, so change value for small and large screens
      let twinkleSpeed;
      if (width > 1024) {
        twinkleSpeed = Math.random() * 0.3 + 0.01;
      } else {
        twinkleSpeed = Math.random() * 0.1 + 0.05;
      }
      // Give the circles random values and push them to the array
      // I decided these values with trial and error, until it felt right
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.6,
        alpha: Math.random(),
        shine: Math.random() + 0.8,
        twinkleSpeed: twinkleSpeed,
        color: color,
      });
    }

    // Function that draws circles to the screen
    const drawCircles = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      for (let i = 0; i < circles.length; i++) {
        ctx.fillStyle = circles[i].color;
        ctx.globalAlpha = circles[i].alpha * circles[i].shine;
        ctx.shadowBlur = 5;
        ctx.shadowColor = circles[i].color;
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Update star position
        if (width > 1024) {
          circles[i].x -= 0.25;
          circles[i].y += 0.25;
        } else {
          circles[i].x -= 0.1;
          circles[i].y += 0.1;
        }

        if (circles[i].x < 0) {
          circles[i].x = canvas.width + circles[i].radius;
        }
        if (circles[i].y > canvas.height) {
          circles[i].y = circles[i].radius;
        }

        circles[i].shine += (Math.random() - 0.5) * circles[i].twinkleSpeed;
        circles[i].shine = Math.max(0.2, Math.min(1, circles[i].shine));
      }

      ctx.restore();
    };

    // Animate the rotation
    const animate = () => {
      drawCircles();
      // Do a repaint of the page and also call the animate function before repainting
      requestAnimationFrame(animate);
    };

    animate();
  }, [width]);

  return (
    <canvas style={{ opacity: opacity }} ref={canvasRef} className={"fixed"} />
  );
};

export default StarrySky;
