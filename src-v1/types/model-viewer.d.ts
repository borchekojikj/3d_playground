declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ios-src"?: string;
        "auto-rotate"?: boolean;
        "camera-controls"?: boolean;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
