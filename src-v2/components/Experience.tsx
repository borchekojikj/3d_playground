import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ModelFood } from "./ModelFood";
export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={1}
        shadow-camera-far={100}
      />
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      <OrbitControls
        minDistance={6}
        maxDistance={12}
        minPolarAngle={0} // Looking straight ahead (horizontal)
        maxPolarAngle={Math.PI / 2} // Limit to 90° (looking straight down)
      />

      <Center>
        <ModelFood scale={[5, 5, 5]} castShadow />
      </Center>
    </>
  );
};
