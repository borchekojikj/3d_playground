// components/ARModelViewer.tsx
import React from "react";
import "@google/model-viewer";

type ARModelViewerProps = {
  glbSrc: string;
  usdzSrc?: string;
  alt?: string;
};

const ARModelViewer: React.FC<ARModelViewerProps> = ({
  glbSrc,
  usdzSrc,
  alt,
}) => {
  return (
    <model-viewer
      src={glbSrc}
      ios-src={usdzSrc}
      alt={alt || "3D model"}
      ar
      ar-modes="scene-viewer quick-look webxr"
      camera-controls
      auto-rotate
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default ARModelViewer;
