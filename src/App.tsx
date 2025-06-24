import HybridARViewer from "./components/FoodModel";
// import ARViewer from "./components/FoodModel";

function App() {
  return (
    <div>
      <HybridARViewer
        glbModelUrl="./models/food_3d.glb" // For WebXR devices
        usdzModelUrl="./models/food_3d.usdz" // For iPhone
        title="Banana 3D Model"
      />
    </div>
  );
}

export default App;
