import HybridARViewer from "./components/FoodModel";
// import ARViewer from "./components/FoodModel";

function App() {
  return (
    <div>
      <HybridARViewer
        glbModelUrl="./models/bannana.glb" // For WebXR devices
        usdzModelUrl="./models/bannana.usdz" // For iPhone
        title="Banana 3D Model"
      />
    </div>
  );
}

export default App;
