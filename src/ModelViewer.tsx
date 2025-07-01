import React, { useEffect, useState } from "react";

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
        src={modelGlbURL}
        alt="3D Model"
        ar={isMobile}
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        environment-image="neutral"
        exposure="0.4"
        camera-controls
        camera-orbit="auto 75deg auto" // Sets a good default starting angle (75deg is slightly above horizontal)
        min-camera-orbit="auto 45deg auto" // Prevents tilting down past 45 degrees (adjust as needed)
        max-camera-orbit="auto 90deg auto" // Prevents tilting up past 90 degrees (horizon)
        touch-action="pan-y"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          borderRadius: "8px",
          "--ar-button-right": "120px",
          "--ar-button-bottom": "20px",
        }}
      />
    </div>
  );
};

export default ModelViewer;
