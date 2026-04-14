"use client";

import { useEditorStore } from "@/lib/store";
import { DeviceFrame } from "./DeviceFrame";
import { memo } from "react";

export const Canvas = memo(function Canvas() {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  const croppedImageUrl = useEditorStore((s) => s.croppedImageUrl);
  const backgroundGradient = useEditorStore((s) => s.backgroundGradient);
  const shadow = useEditorStore((s) => s.shadow);
  const padding = useEditorStore((s) => s.padding);
  const borderRadius = useEditorStore((s) => s.borderRadius);
  const transform3d = useEditorStore((s) => s.transform3d);
  const device = useEditorStore((s) => s.device);
  const pattern = useEditorStore((s) => s.pattern);
  const objectFit = useEditorStore((s) => s.objectFit);

  const displayUrl = croppedImageUrl || imageUrl;
  const gradientCSS = buildGradientCSS(backgroundGradient);
  const patternCSS = getPatternCSS(pattern.type, pattern.color, pattern.scale, pattern.opacity);
  const shadowCSS = shadow.enabled
    ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    : "none";
  const transformCSS = `perspective(${transform3d.perspective}px) rotateX(${transform3d.rotateX}deg) rotateY(${transform3d.rotateY}deg) scale(${transform3d.scale})`;

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 w-full h-full">
      <div
        id="preview-canvas"
        style={{
          background: gradientCSS,
          backgroundImage: patternCSS ? `${patternCSS}, ${gradientCSS}` : gradientCSS,
          padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
          borderRadius: `${borderRadius}px`,
          boxShadow: shadowCSS,
          transform: transformCSS,
          transition: "transform 0.3s ease",
        }}
        className="relative inline-flex items-center justify-center max-w-full"
      >
        {device !== "none" ? (
          <DeviceFrame device={device}>
            <img
              src={displayUrl!}
              alt="Screenshot"
              draggable={false}
              style={{ objectFit }}
              className="block w-full h-full"
            />
          </DeviceFrame>
        ) : (
          <img
            src={displayUrl!}
            alt="Screenshot"
            draggable={false}
            className="block"
            style={{
              objectFit,
              maxWidth: "min(800px, 65vw)",
              maxHeight: "min(600px, 60vh)",
              width: objectFit === "fill" ? "100%" : undefined,
              height: objectFit === "fill" ? "100%" : undefined,
              borderRadius: `${Math.max(borderRadius - padding.top / 4, 4)}px`,
            }}
          />
        )}
      </div>
    </div>
  );
});

function buildGradientCSS(config: { colors: string[]; direction: string }): string {
  const { colors, direction } = config;
  switch (direction) {
    case "radial":
      return `radial-gradient(circle, ${colors.join(", ")})`;
    case "conic":
      return `conic-gradient(from 0deg, ${colors.join(", ")})`;
    default:
      return `linear-gradient(${direction.replace("to-", "to ")}, ${colors.join(", ")})`;
  }
}

function getPatternCSS(type: string, color: string, scale: number, opacity: number): string {
  const s = scale * 20;
  const hex = Math.round(opacity * 255).toString(16).padStart(2, "0");
  switch (type) {
    case "dots":
      return `radial-gradient(circle, ${color}${hex} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(${color}${hex} 1px, transparent 1px), linear-gradient(90deg, ${color}${hex} 1px, transparent 1px)`;
    case "diagonal":
      return `repeating-linear-gradient(45deg, transparent, transparent ${s}px, ${color}${hex} ${s}px, ${color}${hex} ${s + 1}px)`;
    default:
      return "";
  }
}
