import type React from "react";

type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    "camera-controls"?: boolean;
    "camera-orbit"?: string;
    "camera-target"?: string;
    "min-camera-orbit"?: string;
    "max-camera-orbit"?: string;
    "touch-action"?: string;
    "interaction-prompt"?: string;
    exposure?: string;
    "shadow-intensity"?: string;
    "shadow-softness"?: string;
    "environment-image"?: string;
    "tone-mapping"?: string;
  },
  HTMLElement
>;

// React 19 with the react-jsx transform resolves intrinsic elements from
// React.JSX, not the global JSX namespace, so the augmentation goes here.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

export {};
