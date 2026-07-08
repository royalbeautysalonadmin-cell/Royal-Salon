import type { ThreeElements } from "@react-three/fiber";

// React Three Fiber v8 augments the legacy global `JSX` namespace, which
// @types/react@19 no longer uses (intrinsics now resolve via `React.JSX`).
// Re-declare the elements inside the `react` module so <mesh>, <points>,
// <bufferGeometry>, etc. type-check inside the Canvas.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
