import React, { useEffect, useRef, useState } from "react";

type ModelViewerProps = {
  modelGlbURL: string;
  modelUsdzURL?: string; // optional, for iOS AR Quick Look
  height?: string;
};
const ModelViewer: React.FC<ModelViewerProps> = ({
  modelGlbURL,
  height = "50vh",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);

  const launchAR = () => {
    if (modelRef.current) {
      modelRef.current.activateAR();
    }
  };
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

  return (
    <div
      className={`w-full    overflow-hidden relative  min-w-[100vw] md:min-w-0 `}
      style={{ height }}
    >
      <style>
        {`
          model-viewer {
            --ar-button-right: 120px; /* Adjust this value */
            --ar-button-bottom: 20px; /* Adjust this value */
            /* Add !important if absolutely necessary, but try without first */
            /* --ar-button-right: 120px !important; */
            /* --ar-button-bottom: 20px !important; */
          }
        `}
      </style>

      <model-viewer
        ref={modelRef}
        src={modelGlbURL}
        alt="3D Model"
        ar={isMobile}
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        // Realistic Lighting Setup
        // AR-optimized settings
        environment-image="neutral"
        exposure="0.3" // Lower exposure for AR
        shadow-intensity="0.5" // Reduced shadows for AR
        shadow-softness="0.8"
        // Tone mapping helps with AR color accuracy
        tone-mapping="aces"
        camera-controls
        camera-orbit="auto 75deg auto" // Sets a good default starting angle (75deg is slightly above horizontal)
        min-camera-orbit="auto 45deg auto" // Prevents tilting down past 45 degrees (adjust as needed)
        max-camera-orbit="auto 90deg auto" // Prevents tilting up past 90 degrees (horizon)
        touch-action="pan-y"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "transparent",
          borderRadius: "8px",
        }}
      >
        <button
          onClick={launchAR}
          className="absolute bottom-0  md:bottom-0 right-4 md:right-0 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 z-10"
        >
          <span className="text-sm text-white/80">
            🥽 Gericht als AR anzeigen
          </span>
        </button>
      </model-viewer>
    </div>
  );
};

export default ModelViewer;
