import { create } from "zustand";
import {
  defaultProjectState,
  type DeviceType,
  type AnnotationItem,
  type GradientConfig,
  type PatternConfig,
  type ShadowConfig,
  type PaddingConfig,
  type Transform3DConfig,
} from "@/types";

interface EditorStore {
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

  setImage: (url: string, w: number, h: number) => void;
  clearImage: () => void;
  setDevice: (d: DeviceType) => void;
  setGradient: (g: GradientConfig) => void;
  setPattern: (p: PatternConfig) => void;
  setShadow: (s: ShadowConfig) => void;
  setPadding: (p: PaddingConfig) => void;
  setBorderRadius: (r: number) => void;
  setTransform3D: (t: Transform3DConfig) => void;
  addAnnotation: (a: AnnotationItem) => void;
  removeAnnotation: (id: string) => void;
  setExportFormat: (f: "png" | "jpg") => void;
  setExportScale: (s: number) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  ...defaultProjectState,

  setImage: (url, w, h) => set({ imageUrl: url, imageWidth: w, imageHeight: h }),
  clearImage: () => set({ imageUrl: null, imageWidth: 0, imageHeight: 0 }),
  setDevice: (device) => set({ device }),
  setGradient: (backgroundGradient) => set({ backgroundGradient }),
  setPattern: (pattern) => set({ pattern }),
  setShadow: (shadow) => set({ shadow }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setTransform3D: (transform3d) => set({ transform3d }),
  addAnnotation: (a) => set((s) => ({ annotations: [...s.annotations, a] })),
  removeAnnotation: (id) => set((s) => ({ annotations: s.annotations.filter((a) => a.id !== id) })),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setExportScale: (exportScale) => set({ exportScale }),
  reset: () => set(defaultProjectState),
}));
