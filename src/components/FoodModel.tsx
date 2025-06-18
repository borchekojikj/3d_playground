import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

interface ARViewerProps {
  modelUrl?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sessionRef = useRef<XRSession | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load model or create fallback
    if (modelUrl) {
      loadModel(modelUrl, scene);
    } else {
      // Add a simple cube as fallback
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, -1);
      scene.add(cube);
      modelRef.current = cube;
    }

    // Animation loop
    renderer.setAnimationLoop(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    });

    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl]);

  const loadModel = async (url: string, scene: THREE.Scene) => {
    const loader = new GLTFLoader();

    try {
      console.log(`Loading model from: ${url}`);

      const gltf = await loader.loadAsync(url);
      const model = gltf.scene;

      // Scale and position the model
      model.scale.setScalar(0.5); // Adjust scale as needed
      model.position.set(0, 0, -1);

      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.z = -1; // Position in front of camera

      scene.add(model);
      modelRef.current = model;

      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Failed to load model:", error);

      // Fallback to red cube on error
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, -1);
      scene.add(cube);
      modelRef.current = cube;
    }
  };

  const startAR = async () => {
    if (!rendererRef.current) return;

    try {
      // Check if WebXR is supported
      if (!navigator.xr) {
        alert("WebXR not supported on this device");
        return;
      }

      // Check if AR is supported
      const supported = await navigator.xr.isSessionSupported("immersive-ar");
      if (!supported) {
        alert("AR not supported on this device");
        return;
      }

      // Request AR session
      const session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["local", "hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: { root: document.body },
      });

      sessionRef.current = session;
      await rendererRef.current.xr.setSession(session);

      session.addEventListener("end", () => {
        sessionRef.current = null;
      });
    } catch (error) {
      console.error("Failed to start AR session:", error);
      alert(
        "Failed to start AR. Make sure you're using HTTPS and have a compatible device."
      );
    }
  };

  const stopAR = () => {
    if (sessionRef.current) {
      sessionRef.current.end();
    }
  };

  return (
    <div className="ar-container">
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}>
        <button
          onClick={startAR}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Start AR
        </button>
        <button
          onClick={stopAR}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Stop AR
        </button>
      </div>
      {modelUrl && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            color: "white",
            background: "rgba(0,0,0,0.7)",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          Model: {modelUrl.split("/").pop()}
        </div>
      )}
    </div>
  );
};

export default ARViewer;
