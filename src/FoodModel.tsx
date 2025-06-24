import { useEffect } from "react";

// Sample models for demo

const Index = () => {
  useEffect(() => {
    // Check if device is mobile

    const style = document.createElement("style");
    style.innerHTML = `
      model-viewer::part(ar-button) {
        background-color: #6a4c9c;
        border-radius: 12px;
        padding: 10px 20px;
        font-size: 14px;
        color: white;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.3s;
      }
      model-viewer::part(ar-button):hover {
        background-color: #5a3f8b;
        transform: scale(1.05);
      }
      model-viewer::part(ar-button):disabled {
        background-color: #bbb;
        color: #777;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
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

      <div style={{ height: "500px", backgroundColor: "red" }}>
        <model-viewer
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
        />
      </div>
    </div>
  );
};

export default Index;
