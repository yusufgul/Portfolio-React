import React, { useState, useRef, useEffect } from "react";
import Debounce from "../utility/Debounce";
import { useLocation } from "react-router-dom";

const StarrySky = () => {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [isHome, setIsHome] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const canvasRef = useRef(null);
  const isScreenBig = isHome && window.innerWidth > 1024;

  // Make stars appear slowly with opacity
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(opacity + 0.02);
    }, 50);
    return () => clearInterval(intervalId);
  }, [opacity]);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location.pathname]);

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
    // If page is at home, create wide canvas for rotating
    if (isScreenBig) {
      canvas.width = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      );
      canvas.height = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      );
      // If page is not home, set canvas sizes according to the screens' sizes
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    // Create an empty array for circle objects
    const circles = [];
    let circleCount;
    // Create more stars for small screens because less star can be seen at small screens
    // Bigger number means less stars because we divide canvas area by that number
    if (window.innerWidth > 1024) {
      circleCount = Math.round((canvas.width * canvas.height) / (40 * 40));
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

    let angle = 0;
    // Function that draws circles to the screen
    const drawCircles = () => {
      // Save the current state and clear canvas
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Set the orgin point to the center of the canvas' center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // If we are at the home page, rotate the sky
      if (isScreenBig) {
        ctx.rotate(angle);
      }
      // Change origin to the top left, so circles will be drawn relative to the top left corner
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Loop through array
      for (let i = 0; i < circles.length; i++) {
        ctx.fillStyle = circles[i].color;
        // Set the global alpha value to the stars' alpha value multiplied by the stars' shine value
        ctx.globalAlpha = circles[i].alpha * circles[i].shine;
        // Set the shadow blur to 5
        ctx.shadowBlur = 5;
        // Set the color of the blur to the same color of the star
        ctx.shadowColor = circles[i].color;
        // Begin a new path
        ctx.beginPath();
        // 2πr is the circle circumference
        // Draw an arc. x and y are coordinates, 0 is the starting angle
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, 2 * Math.PI);
        // Fill the circle with the color we set before
        ctx.fill();
        // Set the shadow blur to 0
        ctx.shadowBlur = 0;
        // To create a twinkling effect, add shine value a random value between -0.5 and +0.5 multiplied by twinklespeed value
        circles[i].shine += (Math.random() - 0.5) * circles[i].twinkleSpeed;
        // Limit the shine value between 1 and 0.2
        circles[i].shine = Math.min(1, Math.max(0.2, circles[i].shine));
      }
      // Restore the context state
      ctx.restore();
    };

    // Animate the rotation
    const animate = () => {
      // Rotating is more obivious at small screens, so reduce it for small screens
      if (window.innerWidth > 1024) {
        angle -= 0.0005;
      } else {
        angle -= 0.0003;
      }
      drawCircles();
      // Do a repaint of the page and also call the animate function before repainting
      requestAnimationFrame(animate);
    };

    animate();
  }, [width, isScreenBig]);

  return (
    <canvas
      style={{ opacity: opacity }}
      ref={canvasRef}
      className={isScreenBig ? "rounded-full fixed" : "fixed"}
    />
  );
};

export default StarrySky;
