export type DeviceType =
  | "none"
  | "iphone-15"
  | "iphone-15-pro"
  | "pixel-8"
  | "samsung-s24"
  | "macbook-pro"
  | "imac"
  | "browser-chrome"
  | "browser-safari"
  | "browser-firefox"
  | "ipad-pro"
  | "android-tablet";

export type GradientDirection =
  | "to-right"
  | "to-bottom"
  | "to-br"
  | "to-bl"
  | "radial"
  | "conic";

export type ObjectFitType = "contain" | "cover" | "fill";

export interface GradientConfig {
  colors: string[];
  direction: GradientDirection;
}

export interface PatternConfig {
  type: "none" | "dots" | "grid" | "diagonal" | "circles" | "waves";
  color: string;
  scale: number;
  opacity: number;
}

export interface ShadowConfig {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface PaddingConfig {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Transform3DConfig {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  perspective: number;
  scale: number;
}

export interface AnnotationItem {
  id: string;
  type: "arrow" | "rect" | "text" | "step-number" | "circle" | "highlight";
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
  fontSize?: number;
  strokeWidth?: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProjectState {
  imageUrl: string | null;
  imageWidth: number;
  imageHeight: number;
  device: DeviceType;
  backgroundGradient: GradientConfig;
  pattern: PatternConfig;
  shadow: ShadowConfig;
  padding: PaddingConfig;
  borderRadius: number;
  transform3d: Transform3DConfig;
  annotations: AnnotationItem[];
  exportFormat: "png" | "jpg";
  exportScale: number;
  objectFit: ObjectFitType;
  croppedImageUrl: string | null;
  cropArea: CropArea | null;
  showCropDialog: boolean;
}

export const defaultProjectState: ProjectState = {
  imageUrl: null,
  imageWidth: 0,
  imageHeight: 0,
  device: "none",
  backgroundGradient: {
    colors: ["#667eea", "#764ba2"],
    direction: "to-br",
  },
  pattern: {
    type: "none",
    color: "#ffffff",
    scale: 1,
    opacity: 0.1,
  },
  shadow: {
    enabled: true,
    x: 0,
    y: 20,
    blur: 60,
    spread: 0,
    color: "rgba(0,0,0,0.3)",
  },
  padding: {
    top: 80,
    right: 80,
    bottom: 80,
    left: 80,
  },
  borderRadius: 16,
  transform3d: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    perspective: 1000,
    scale: 1,
  },
  annotations: [],
  exportFormat: "png",
  exportScale: 2,
  objectFit: "contain",
  croppedImageUrl: null,
  cropArea: null,
  showCropDialog: false,
};

export const presetGradients: GradientConfig[] = [
  { colors: ["#667eea", "#764ba2"], direction: "to-br" },
  { colors: ["#f093fb", "#f5576c"], direction: "to-br" },
  { colors: ["#4facfe", "#00f2fe"], direction: "to-right" },
  { colors: ["#43e97b", "#38f9d7"], direction: "to-right" },
  { colors: ["#fa709a", "#fee140"], direction: "to-br" },
  { colors: ["#a18cd1", "#fbc2eb"], direction: "to-right" },
  { colors: ["#fccb90", "#d57eeb"], direction: "to-br" },
  { colors: ["#e0c3fc", "#8ec5fc"], direction: "to-br" },
  { colors: ["#f5576c", "#ff6a00"], direction: "to-br" },
  { colors: ["#0c0c0c", "#434343"], direction: "to-bottom" },
  { colors: ["#1a1a2e", "#16213e", "#0f3460"], direction: "to-br" },
  { colors: ["#ffffff", "#f0f0f0"], direction: "to-bottom" },
];

export const deviceOptions: { name: string; type: DeviceType; category: string }[] = [
  { name: "None", type: "none", category: "General" },
  { name: "iPhone 15", type: "iphone-15", category: "Phone" },
  { name: "iPhone 15 Pro", type: "iphone-15-pro", category: "Phone" },
  { name: "Pixel 8", type: "pixel-8", category: "Phone" },
  { name: "iPad Pro", type: "ipad-pro", category: "Tablet" },
  { name: "MacBook Pro", type: "macbook-pro", category: "Laptop" },
  { name: "Chrome", type: "browser-chrome", category: "Browser" },
  { name: "Safari", type: "browser-safari", category: "Browser" },
  { name: "Firefox", type: "browser-firefox", category: "Browser" },
];
