import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import StarrySky from "./components/ui/StarrySky";
import Home from "./components/Pages/Home";
import ButtonBar from "./components/ui/ButtonBar";
import About from "./components/Pages/About";
import Projects from "./components/Pages/Projects";
import Contact from "./components/Pages/Contact";

const App = () => {
  return (
    <HashRouter>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <StarrySky />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ButtonBar />
      </div>
    </HashRouter>
  );
};

export default App;
