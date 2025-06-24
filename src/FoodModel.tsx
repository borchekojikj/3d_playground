import { useEffect, useRef } from "react";

const Index = () => {
  const modelViewerRef = useRef<HTMLModelViewerElement | null>(null);

  useEffect(() => {
    // Check if device is mobile

    // Load model-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = () => {
      console.log("Model-viewer loaded");
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleEnterAR = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.enterXR();
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <div className="test">View in AR</div>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">
              3D Model Viewer
            </h1>
            <p className="text-slate-300 text-lg">
              Upload and explore your 3D models with AR support
            </p>
          </div>
        </div>

        <div style={{ height: "500px" }}>
          {/* <model-viewer
          src={"./models/food_3d.glb"}
          alt="3D Model"
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          environment-image="neutral"
          exposure="0.6"
          camera-controls
          touch-action="pan-y"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            borderRadius: "8px",
            }}
        /> */}
          <model-viewer
            ref={modelViewerRef}
            src="./models/food_3d.glb"
            ios-src="./models/food_3d.usdz"
            alt="3D Model"
            ar
            ar-modes="scene-viewer webxr quick-look"
            ar-scale="auto"
            camera-controls
            touch-action="pan-y"
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "transparent",
            }}
          >
            <button
              onClick={handleEnterAR}
              className="absolute bottom-10 right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 z-10"
            >
              🥽 Gericht als AR anzeigen
            </button>
          </model-viewer>
        </div>
      </div>
    </>
  );
};

export default Index;
