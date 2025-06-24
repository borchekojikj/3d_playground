import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";

function App() {
  return (
    <div className="">
      <div
        id="navbar"
        className="flex gap-5 py-3 justify-start bg-green-100 text-2xl text-gray-500 ps-5"
      >
        <div className="hover:text-green-700  cursor-pointer">Home</div>
        <div className="hover:text-green-700  cursor-pointer">Pricing</div>
        <div className="hover:text-green-700  cursor-pointer">About</div>
        <div className="hover:text-green-700  cursor-pointer">Contact</div>
      </div>

      <Canvas
        shadows
        style={{ width: "550px", height: "550px" }}
        className="m-auto shadow-xl"
      >
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
