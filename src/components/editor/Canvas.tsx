"use client";

import { useEditorStore } from "@/lib/store";
import { DeviceFrame } from "./DeviceFrame";
import { memo, useState, useCallback, useRef } from "react";

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

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const displayUrl = croppedImageUrl || imageUrl;
  const isTransparent = backgroundGradient.transparent === true;
  const gradientCSS = isTransparent ? "none" : buildGradientCSS(backgroundGradient);
  const patternCSS = isTransparent ? "" : getPatternCSS(pattern.type, pattern.color, pattern.scale, pattern.opacity);
  const shadowCSS = shadow.enabled && !isTransparent
    ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
    : "none";
  const clampedRotateX = Math.max(-30, Math.min(30, transform3d.rotateX));
  const clampedRotateY = Math.max(-30, Math.min(30, transform3d.rotateY));
  const clampedScale = Math.max(0.5, Math.min(1.5, transform3d.scale));
  const clampedPerspective = Math.max(300, Math.min(1500, transform3d.perspective));
  const transformCSS = `perspective(${clampedPerspective}px) rotateX(${clampedRotateX}deg) rotateY(${clampedRotateY}deg) scale(${clampedScale})`;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  if (!imageUrl) return null;

  return (
    <div
      className="flex items-center justify-center p-4 sm:p-8 w-full h-full overflow-auto"
      style={{ cursor: isDragging ? "grabbing" : "default" }}
    >
      {/* Export boundary indicator */}
      <div
        className="relative"
        style={{
          padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
          borderRadius: `${borderRadius}px`,
          boxShadow: shadowCSS,
          transform: `translate(${offset.x}px, ${offset.y}px) ${transformCSS}`,
          transition: isDragging ? "none" : "transform 0.3s ease",
          background: isTransparent
            ? "repeating-conic-gradient(#e4e4e7 0% 25%, #ffffff 0% 50%) 0 0 / 16px 16px"
            : gradientCSS,
          backgroundImage: isTransparent ? undefined : (patternCSS ? `${patternCSS}, ${gradientCSS}` : gradientCSS),
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Export boundary label */}
        <div className="absolute -top-7 left-0 text-[9px] font-mono text-[#a1a1aa] bg-white/80 px-1.5 py-0.5 rounded border border-[#e4e4e7]">
          {padding.left + padding.right + (device !== "none" ? (device.includes("browser") ? 0 : (device.includes("macbook") ? 64 : 24)) : 0)} ×{" "}
          {padding.top + padding.bottom + (device !== "none" ? (device.includes("browser") ? 36 : (device.includes("macbook") ? 74 : (device.includes("ipad") ? 32 : 40))) : 0)} px export
        </div>

        {/* Corner handles for drag */}
        <div className="absolute -inset-0.5 rounded-[calc(var(--radius,8px)+2px)] border-2 border-dashed border-[#6366f1]/40 pointer-events-none opacity-0 hover:opacity-100 transition-opacity" />

        {/* Content */}
        <div className="relative" style={{ cursor: isDragging ? "grabbing" : "grab" }}>
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
