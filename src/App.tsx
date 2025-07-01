// import HybridARViewer from "./components/FoodModel";
// import ARViewer from "./components/FoodModel";

import ModelViewer from "./ModelViewer";

function App() {
  return (
    <div style={{ height: "500px" }}>
      <ModelViewer modelGlbURL="/models/bannana.glb" height="35vh" />
    </div>
  );
}

export default App;
