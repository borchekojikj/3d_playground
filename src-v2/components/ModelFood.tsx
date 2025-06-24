import { type ComponentProps } from "react";

import { Mesh, Material } from "three";

import { useGLTF } from "@react-three/drei";

type GLTFResult = {
  nodes: {
    mesh_0: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
};

export const ModelFood = (props: ComponentProps<"group">) => {
  const { nodes } = useGLTF("/models/food.glb") as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
};

useGLTF.preload("/models/food.glb");
