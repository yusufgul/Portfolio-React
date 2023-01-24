import React, { useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";

const About = () => {
  //Function that handles hopping of the icons
  const hop = () => {
    const icons = document.querySelectorAll(".hop");
    for (let i = 0; i < icons.length; i++) {
      setTimeout(() => {
        icons[i].style.animation = "hop 6s ease-in-out infinite";
      }, i * 1000);
    }
  };
  useEffect(() => {
    hop();
  }, []);

  return (
    <div className="flex flex-col justify-center items-stretch w-[70%] lg:w-[60%]">
      <div className="hidden hide flex-row place-content-around text-white text-[50px] my-4 lg:my-20 gap-5">
        <FaReact className="text-[#62dafc] hop" />
        <SiJavascript className="text-[#ffdf00] hop" />
        <SiTailwindcss className="text-[#07b6d5] hop" />
        <FaHtml5 className="text-[#fe5722] hop" />
        <FaCss3Alt className="text-[#2196f3] hop" />
        <FaNodeJs className="text-[#82cd28] hop" />
      </div>
      <p className="text-[14px] lg:text-[18px] lg:leading-loose text-white font-mono bg-[#03040b] z-10">
        "Welcome to my portfolio! I am a front-end developer experienced in
        Javascript, React, HTML, CSS and Tailwind. I also have a basic
        understanding of Node.js. I have an inquisitive character and am eager
        to learn whatever interests me. This is exactly why I want to work as a
        front-end developer. Being a front-end developer allows me to tap into
        my creativity and bring my ideas to life. I am excited by the limitless
        possibilities that technology offers and am passionate about creating
        beautiful and functional websites through collaboration with others. I
        look forward to the opportunity to work with you and create something
        truly exceptional."
      </p>
      <div className="hidden hide flex-row place-content-around text-white text-[50px] my-4 lg:my-20 gap-5">
        <FaNodeJs className="text-[#82cd28] hop" />
        <FaCss3Alt className="text-[#2196f3] hop" />
        <FaHtml5 className="text-[#fe5722] hop" />
        <SiTailwindcss className="text-[#07b6d5] hop" />
        <SiJavascript className="text-[#ffdf00] hop" />
        <FaReact className="text-[#62dafc] hop" />
      </div>
    </div>
  );
};

export default About;
