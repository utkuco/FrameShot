"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { GradientConfig, PaddingConfig, DeviceType } from "@/types";
import { Palette, Monitor, Layers, Box, Sparkles, ChevronDown, ChevronUp, Smartphone, Tablet, Laptop, Globe } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  return (
    <div className="flex flex-col text-sm">
      <div className="px-4 py-3 border-b border-[var(--border-color)]">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Settings</h2>
      </div>
      <div className="flex flex-col divide-y divide-[var(--border-color)]">
        <Section icon={<Palette className="w-3.5 h-3.5" />} title="Background">
          <GradientPicker />
          <PatternPicker />
        </Section>
        <Section icon={<Monitor className="w-3.5 h-3.5" />} title="Device Frame">
          <DevicePicker />
        </Section>
        <Section icon={<Layers className="w-3.5 h-3.5" />} title="Padding & Radius">
          <PaddingControls />
          <RadiusControl />
        </Section>
        <Section icon={<Box className="w-3.5 h-3.5" />} title="Shadow">
          <ShadowControls />
        </Section>
        <Section icon={<Sparkles className="w-3.5 h-3.5" />} title="3D Transform">
          <TransformControls />
        </Section>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="px-4 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-0.5"
      >
        <span className="flex items-center gap-2">
          <span className="text-[var(--accent)]">{icon}</span>
          {title}
        </span>
        {open ? <ChevronUp className="w-3 h-3 text-[var(--text-tertiary)]" /> : <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />}
      </button>
      {open && <div className="mt-3 space-y-4">{children}</div>}
    </div>
  );
}

function GradientPicker() {
  const gradient = useEditorStore((s) => s.backgroundGradient);
  const setGradient = useEditorStore((s) => s.setGradient);
  return (
    <div>
      <label className="text-[11px] font-medium text-[var(--text-tertiary)] mb-2 block">Gradient</label>
      <div className="grid grid-cols-6 gap-1.5">
        {presetGradients.map((g, i) => {
          const css = `linear-gradient(to right, ${g.colors.join(", ")})`;
          const isSelected = gradient.colors.join() === g.colors.join();
          return (
            <button
              key={i}
              onClick={() => setGradient(g)}
              className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-105 ${isSelected ? "border-white ring-1 ring-[var(--accent)] scale-105" : "border-transparent hover:border-white/20"}`}
              style={{ background: css }}
            />
          );
        })}
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <label className="text-[10px] font-medium text-[var(--text-tertiary)] mb-1 block">Color 1</label>
          <input
            type="color"
            value={gradient.colors[0]}
            onChange={(e) => setGradient({ ...gradient, colors: [e.target.value, ...gradient.colors.slice(1)] })}
            className="w-full h-8 rounded-lg border border-[var(--border-color)] bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-medium text-[var(--text-tertiary)] mb-1 block">Color 2</label>
          <input
            type="color"
            value={gradient.colors[1]}
            onChange={(e) => setGradient({ ...gradient, colors: [gradient.colors[0], e.target.value] })}
            className="w-full h-8 rounded-lg border border-[var(--border-color)] bg-transparent cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function PatternPicker() {
  const pattern = useEditorStore((s) => s.pattern);
  const setPattern = useEditorStore((s) => s.setPattern);
  return (
    <div>
      <label className="text-[11px] font-medium text-[var(--text-tertiary)] mb-2 block">Pattern</label>
      <div className="flex gap-1.5">
        {(["none", "dots", "grid", "diagonal"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPattern({ ...pattern, type: t })}
            className={`flex-1 px-2 py-1.5 text-[11px] font-medium rounded-lg border transition-all ${
              pattern.type === t
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border-color)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {t === "none" ? "None" : t === "dots" ? "●" : t === "grid" ? "▦" : "╲"}
          </button>
        ))}
      </div>
    </div>
  );
}

function DevicePicker() {
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);

  const categoryConfig: Record<string, { icon: React.ReactNode; label: string }> = {
    "Genel": { icon: <Monitor className="w-3 h-3" />, label: "General" },
    "Telefon": { icon: <Smartphone className="w-3 h-3" />, label: "Phone" },
    "Tablet": { icon: <Tablet className="w-3 h-3" />, label: "Tablet" },
    "Dizüstü": { icon: <Laptop className="w-3 h-3" />, label: "Laptop" },
    "Tarayıcı": { icon: <Globe className="w-3 h-3" />, label: "Browser" },
  };
  const categories = ["Genel", "Telefon", "Tablet", "Dizüstü", "Tarayıcı"];

  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const items = deviceOptions.filter((d) => d.category === cat);
        if (items.length === 0) return null;
        const config = categoryConfig[cat];
        return (
          <div key={cat}>
            <p className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              {config?.icon}
              {config?.label || cat}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((d) => (
                <button
                  key={d.type}
                  onClick={() => setDevice(d.type as DeviceType)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all ${
                    device === d.type
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border-color)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PaddingControls() {
  const padding = useEditorStore((s) => s.padding);
  const setPadding = useEditorStore((s) => s.setPadding);
  const update = (key: keyof PaddingConfig, val: number) => setPadding({ ...padding, [key]: val });

  const labels: Record<string, string> = { top: "Top", right: "Right", bottom: "Bottom", left: "Left" };

  return (
    <div>
      <label className="text-[11px] font-medium text-[var(--text-tertiary)] mb-2 block">Padding</label>
      <div className="grid grid-cols-2 gap-2">
        {(["top", "right", "bottom", "left"] as const).map((dir) => (
          <div key={dir} className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-medium text-[var(--text-tertiary)]">{labels[dir]}</label>
              <span className="text-[10px] text-[var(--accent)] font-mono">{padding[dir]}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={200}
              value={padding[dir]}
              onChange={(e) => update(dir, Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusControl() {
  const borderRadius = useEditorStore((s) => s.borderRadius);
  const setBorderRadius = useEditorStore((s) => s.setBorderRadius);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-medium text-[var(--text-tertiary)]">Border Radius</label>
        <span className="text-[10px] text-[var(--accent)] font-mono">{borderRadius}px</span>
      </div>
      <input
        type="range"
        min={0}
        max={64}
        value={borderRadius}
        onChange={(e) => setBorderRadius(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function ShadowControls() {
  const shadow = useEditorStore((s) => s.shadow);
  const setShadow = useEditorStore((s) => s.setShadow);
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-[11px] font-medium text-[var(--text-secondary)] cursor-pointer">
        <div className={`relative w-7 h-3.5 rounded-full transition-colors ${shadow.enabled ? "bg-[var(--accent)]" : "bg-[var(--border-color)]"}`}>
          <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${shadow.enabled ? "left-3.5" : "left-0.5"}`} />
        </div>
        <input
          type="checkbox"
          checked={shadow.enabled}
          onChange={(e) => setShadow({ ...shadow, enabled: e.target.checked })}
          className="sr-only"
        />
        Shadow Enabled
      </label>
      {shadow.enabled && (
        <div className="space-y-2">
          <SliderControl label="X" value={shadow.x} min={-50} max={50} onChange={(v) => setShadow({ ...shadow, x: v })} />
          <SliderControl label="Y" value={shadow.y} min={-50} max={100} onChange={(v) => setShadow({ ...shadow, y: v })} />
          <SliderControl label="Blur" value={shadow.blur} min={0} max={200} onChange={(v) => setShadow({ ...shadow, blur: v })} />
        </div>
      )}
    </div>
  );
}

function TransformControls() {
  const t3d = useEditorStore((s) => s.transform3d);
  const setTransform3D = useEditorStore((s) => s.setTransform3D);
  return (
    <div className="space-y-2">
      <SliderControl label="Rotate X" value={t3d.rotateX} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateX: v })} />
      <SliderControl label="Rotate Y" value={t3d.rotateY} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateY: v })} />
      <SliderControl label="Perspective" value={t3d.perspective} min={200} max={2000} onChange={(v) => setTransform3D({ ...t3d, perspective: v })} />
      <SliderControl label="Scale" value={t3d.scale * 100} min={50} max={150} onChange={(v) => setTransform3D({ ...t3d, scale: v / 100 })} suffix="%" />
      <button
        onClick={() => setTransform3D({ rotateX: 0, rotateY: 0, rotateZ: 0, perspective: 1000, scale: 1 })}
        className="w-full text-[11px] font-medium py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-all"
      >
        Reset
      </button>
    </div>
  );
}

function SliderControl({ label, value, min, max, onChange, suffix = "px" }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <label className="text-[10px] font-medium text-[var(--text-tertiary)]">{label}</label>
        <span className="text-[10px] text-[var(--accent)] font-mono tabular-nums">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
