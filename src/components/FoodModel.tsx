import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

interface HybridARViewerProps {
  glbModelUrl?: string; // For WebXR devices
  usdzModelUrl?: string; // For iPhone AR Quick Look
  title?: string;
}

const HybridARViewer: React.FC<HybridARViewerProps> = ({
  glbModelUrl,
  usdzModelUrl,
  title = "3D Model",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sessionRef = useRef<XRSession | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  const [isIOS, setIsIOS] = useState(false);
  const [webXRSupported, setWebXRSupported] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check WebXR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then(setWebXRSupported);
    }
  }, []);

  useEffect(() => {
    if (isIOS || !containerRef.current || !glbModelUrl) return;

    // Initialize Three.js scene for non-iOS devices
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

    // Load model
    loadModel(glbModelUrl, scene);

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
  }, [glbModelUrl, isIOS]);

  const loadModel = async (url: string, scene: THREE.Scene) => {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(url);
      const model = gltf.scene;
      model.scale.setScalar(0.5);
      model.position.set(0, 0, -1);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.z = -1;

      scene.add(model);
      modelRef.current = model;
    } catch (error) {
      console.error("Failed to load model:", error);
      // Fallback cube
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, -1);
      scene.add(cube);
      modelRef.current = cube;
    }
  };

  const startWebXRAR = async () => {
    if (!rendererRef.current) return;

    try {
      const session = await navigator.xr!.requestSession("immersive-ar", {
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

  // iPhone AR Quick Look Interface
  if (isIOS) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            maxWidth: "320px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              marginBottom: "15px",
              fontWeight: "300",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            Experience this 3D model in your space using iPhone's native AR
            technology
          </p>
        </div>

        {usdzModelUrl ? (
          <a
            href={usdzModelUrl}
            rel="ar"
            style={{
              display: "inline-block",
              padding: "18px 35px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              textDecoration: "none",
              borderRadius: "15px",
              fontSize: "18px",
              fontWeight: "600",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            🚀 Launch AR Experience
          </a>
        ) : (
          <div
            style={{
              padding: "18px 35px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <p>⚠️ USDZ model required for iPhone AR</p>
          </div>
        )}

        <p
          style={{
            marginTop: "25px",
            fontSize: "13px",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Requires iOS 12+ • iPhone 6s or newer
        </p>
      </div>
    );
  }

  // WebXR Interface for other devices
  return (
    <div className="ar-container">
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}>
        {webXRSupported ? (
          <button
            onClick={startWebXRAR}
            style={{
              padding: "15px 25px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
            }}
          >
            🥽 Start WebXR AR
          </button>
        ) : (
          <div
            style={{
              padding: "15px 25px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            ⚠️ WebXR AR not supported on this device
          </div>
        )}
      </div>

      {glbModelUrl && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            color: "white",
            background: "rgba(0,0,0,0.7)",
            padding: "10px 15px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          Model: {glbModelUrl.split("/").pop()}
        </div>
      )}
    </div>
  );
};

export default HybridARViewer;
