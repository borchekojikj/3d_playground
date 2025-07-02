// import HybridARViewer from "./components/FoodModel";
// import ARViewer from "./components/FoodModel";

import ARModelViewer from "./ARModelViewer";
import ModelViewer from "./ModelViewer";

function App() {
  return (
    <div style={{ height: "500px" }} className="bg-gray-500">
      <ModelViewer
        modelGlbURL="/models/burger.glb"
        height="35vh"
        modelUsdzURL="/models/burger.usdz"
      />
      <ModelViewer modelGlbURL="/models/food_3d.glb" height="35vh" />

      <hr />

      <ARModelViewer
        glbSrc="/models/burger.glb"
        usdzSrc="/models/burger.usdz"
        alt="Astronaut model"
      />

      <hr />

      <ARModelViewer glbSrc="/models/bannana.glb" alt="Astronaut model" />
    </div>
  );
}

export default App;
