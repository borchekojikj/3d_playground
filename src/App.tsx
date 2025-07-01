// import HybridARViewer from "./components/FoodModel";
// import ARViewer from "./components/FoodModel";

import ModelViewer from "./ModelViewer";

function App() {
  return (
    <div style={{ height: "500px" }} className="bg-gray-500">
      <ModelViewer modelGlbURL="/models/bannana.glb" height="35vh" />
      <ModelViewer modelGlbURL="/models/food_3d.glb" height="35vh" />
    </div>
  );
}

export default App;
