import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import app from "../firebase/FirebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const db = getFirestore(app);

const Projects = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sort projects by their id, last added comes first
  const compare = (a, b) => {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  };
  useEffect(() => {
    // Fetch projec information from firebase
    const fetchData = async () => {
      try {
        // Check if there is internet connection
        if (navigator.onLine) {
          const querySnapshot = await getDocs(collection(db, "projects"));
          let docData = [];
          querySnapshot.forEach((doc) => {
            docData.push(doc.data());
          });
          docData.sort(compare);
          setData(docData);
        } else {
          throw new Error("No internet connection");
        }
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    };
    fetchData();
    // cleanup function
    return () => {
      setData([]);
    };
  }, []);

  // When data is available, quit loading
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  if (error) {
    return (
      <div className="text-white">
        {error ? error : "Something went wrong!"}
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="text-white text-[80px]">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  } else {
    const flexElements = data.map((obj) => {
      return (
        <div
          key={obj.id}
          className="relative flex justify-center items-center border-2 border-solid border-white 
        w-[300px] h-[150px] rounded-xl z-15"
          style={{
            background: `linear-gradient(to right, ${obj.color1}, ${obj.color2})`,
          }}
        >
          <p className="pb-5">{obj.name}</p>
          <button className="absolute bottom-[8px] left-[8px] text-[20px]">
            <BsPlayCircleFill
              onClick={() => window.open(`${obj.demoLink}`, "_blank")}
            />
          </button>
          <button className="absolute bottom-[8px] right-[8px] text-[20px]">
            <FaGithub
              onClick={() => window.open(`${obj.projectLink}`, "_blank")}
            />
          </button>
        </div>
      );
    });

    return (
      <div className="flex justify-center items-start lg:items-center w-[90%] h-[90%]">
        <div className="flex flex-wrap gap-5 m-2 place-content-center text-white text-[35px] pb-[35px]">
          {flexElements}
        </div>
      </div>
    );
  }
};

export default Projects;
