import React, { useState, useRef, useEffect } from "react";

// Sample models for demo
const sampleModels = [
  {
    name: "Helmet",
    url: "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
    thumbnail: "/placeholder.svg",
  },
  {
    name: "Avocado",
    url: "https://threejs.org/examples/models/gltf/Avocado.gltf",
    thumbnail: "/placeholder.svg",
  },
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState(sampleModels[0].url);
  const [isMobile, setIsMobile] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Check if device is mobile
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
        userAgent
      );
    setIsMobile(isMobileDevice);

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
    };
  }, []);

  const getARButtonText = () => {
    if (!isMobile) return "AR (Mobile Only)";
    return "View in AR";
  };

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
          ref={modelViewerRef}
          src={"./models/food_3d.glb"}
          alt="3D Model"
          ar={isMobile}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">
                Select Model
              </h2>
              <div className="space-y-3">
                {sampleModels.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedModel(model.url);
                      setModelLoaded(false);
                      setModelError(false);
                    }}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedModel === model.url
                        ? "border-purple-400 bg-purple-500/20 text-white"
                        : "border-white/20 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>

              {/* Status Display */}
              <div className="mt-4 p-3 rounded-lg bg-slate-800/50">
                <div className="text-sm text-slate-300">
                  Status:{" "}
                  {modelError ? (
                    <span className="text-red-400">Error loading model</span>
                  ) : modelLoaded ? (
                    <span className="text-green-400">Model loaded</span>
                  ) : (
                    <span className="text-yellow-400">Loading...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Model Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="relative" style={{ height: "500px" }}>
                {modelError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 rounded-lg border border-red-500/50">
                    <div className="text-center text-red-300">
                      <div className="text-xl mb-2">⚠️</div>
                      <div>Failed to load model</div>
                      <div className="text-sm mt-1">
                        Check the model URL and try again
                      </div>
                    </div>
                  </div>
                )}

                <model-viewer
                  ref={modelViewerRef}
                  src={"./models/food_3d.glb"}
                  alt="3D Model"
                  ar={isMobile}
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

              {/* Controls */}
              <div className="mt-4 flex gap-3">
                <button
                  disabled={!isMobile || modelError}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isMobile && !modelError
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {getARButtonText()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
