import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ButtonBar = () => {
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState("home");

  // Set state to the selected button
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedButton("home");
    } else if (location.pathname === "/about") {
      setSelectedButton("about");
    } else if (location.pathname === "/projects") {
      setSelectedButton("projects");
    } else if (location.pathname === "/contact") {
      setSelectedButton("contact");
    }
  }, [location]);

  const handleClick = (e) => {
    setSelectedButton(e.target.name);
  };

  return (
    <div className="fixed bottom-0 flex flex-row items-center justify-center h-[25px] gap-10 text-white bg-[#03040b] z-10">
      <Link to="/">
        <button
          name="home"
          onClick={handleClick}
          className={`${
            selectedButton === "home"
              ? "text-[#41A6D4] underline -translate-y-[3px] font-bold"
              : ""
          }`}
        >
          Home
        </button>
      </Link>
      <Link to="/about">
        <button
          name="about"
          onClick={handleClick}
          className={`${
            selectedButton === "about"
              ? "text-[#41A6D4] underline -translate-y-[3px] font-bold"
              : ""
          }`}
        >
          About
        </button>
      </Link>
      <Link to="/projects">
        <button
          name="projects"
          onClick={handleClick}
          className={`${
            selectedButton === "projects"
              ? "text-[#41A6D4] underline -translate-y-[3px] font-bold"
              : ""
          }`}
        >
          Projects
        </button>
      </Link>
      <Link to="/contact">
        <button
          name="contact"
          onClick={handleClick}
          className={`${
            selectedButton === "contact"
              ? "text-[#41A6D4] underline -translate-y-[3px] font-bold"
              : ""
          }`}
        >
          Contact
        </button>
      </Link>
    </div>
  );
};

export default ButtonBar;
