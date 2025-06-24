import { useEffect } from "react";

// Sample models for demo

const Index = () => {
  useEffect(() => {
    // Check if device is mobile

    const style = document.createElement("style");
    style.innerHTML = `
  model-viewer::part(ar-button) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 12px 24px;
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  model-viewer::part(ar-button):hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  model-viewer::part(ar-button):disabled {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`;
    document.head.appendChild(style);

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
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      document.head.removeChild(style);
    };
  }, []);

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
            src={"./models/food_3d.glb"}
            alt="3D Model"
            ar={true} // Force AR button to be shown even on non-mobile devices
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
          >
            <div className="absolute bottom-10 md:bottom-0 right-4 md:right-0 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 z-10">
              <span className="text-sm text-white/80">
                🥽 Gericht als AR anzeigen
              </span>
            </div>
          </model-viewer>
        </div>
      </div>
    </>
  );
};

export default Index;
