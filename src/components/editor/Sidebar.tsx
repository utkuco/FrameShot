"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { GradientConfig, PaddingConfig, DeviceType } from "@/types";
import { Palette, Monitor, Layers, Box, Sparkles, ChevronDown, ChevronUp, Smartphone, Tablet, Laptop, Globe } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-4 border-b border-[var(--border-color)]">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Ayarlar</h2>
      </div>
      <div className="flex flex-col divide-y divide-[var(--border-color)]">
        <Section icon={<Palette className="w-4 h-4" />} title="Arka Plan">
          <GradientPicker />
          <PatternPicker />
        </Section>
        <Section icon={<Monitor className="w-4 h-4" />} title="Cihaz Çerçevesi">
          <DevicePicker />
        </Section>
        <Section icon={<Layers className="w-4 h-4" />} title="Boşluk & Köşe">
          <PaddingControls />
          <RadiusControl />
        </Section>
        <Section icon={<Box className="w-4 h-4" />} title="Gölge">
          <ShadowControls />
        </Section>
        <Section icon={<Sparkles className="w-4 h-4" />} title="3D Dönüşüm">
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
        className="flex items-center justify-between w-full text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-1"
      >
        <span className="flex items-center gap-2">
          <span className="text-[var(--accent)]">{icon}</span>
          {title}
        </span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-[var(--text-secondary)]" /> : <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
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
      <label className="text-xs font-medium text-[var(--text-secondary)] mb-2.5 block">Gradyan</label>
      <div className="grid grid-cols-6 gap-2">
        {presetGradients.map((g, i) => {
          const css = `linear-gradient(to right, ${g.colors.join(", ")})`;
          const isSelected = gradient.colors.join() === g.colors.join();
          return (
            <button
              key={i}
              onClick={() => setGradient(g)}
              className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 shadow-sm ${isSelected ? "border-white ring-2 ring-[var(--accent)] scale-110" : "border-transparent hover:border-white/30"}`}
              style={{ background: css }}
            />
          );
        })}
      </div>
      <div className="flex gap-3 mt-4">
        <div className="flex-1">
          <label className="text-[11px] font-medium text-[var(--text-secondary)] mb-1 block">Renk 1</label>
          <input
            type="color"
            value={gradient.colors[0]}
            onChange={(e) => setGradient({ ...gradient, colors: [e.target.value, ...gradient.colors.slice(1)] })}
            className="w-full h-9 rounded-lg border border-[var(--border-color)] bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <label className="text-[11px] font-medium text-[var(--text-secondary)] mb-1 block">Renk 2</label>
          <input
            type="color"
            value={gradient.colors[1]}
            onChange={(e) => setGradient({ ...gradient, colors: [gradient.colors[0], e.target.value] })}
            className="w-full h-9 rounded-lg border border-[var(--border-color)] bg-transparent cursor-pointer"
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
      <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Desen</label>
      <div className="flex gap-2">
        {(["none", "dots", "grid", "diagonal"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPattern({ ...pattern, type: t })}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              pattern.type === t
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-sm"
                : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-tertiary)]"
            }`}
          >
            {t === "none" ? "Yok" : t === "dots" ? "●" : t === "grid" ? "▦" : "╲"}
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
    "Genel": { icon: <Monitor className="w-3.5 h-3.5" />, label: "Genel" },
    "Telefon": { icon: <Smartphone className="w-3.5 h-3.5" />, label: "Telefon" },
    "Tablet": { icon: <Tablet className="w-3.5 h-3.5" />, label: "Tablet" },
    "Dizüstü": { icon: <Laptop className="w-3.5 h-3.5" />, label: "Dizüstü" },
    "Tarayıcı": { icon: <Globe className="w-3.5 h-3.5" />, label: "Tarayıcı" },
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
            <p className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              {config?.icon}
              {config?.label || cat}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((d) => (
                <button
                  key={d.type}
                  onClick={() => setDevice(d.type as DeviceType)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    device === d.type
                      ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-sm"
                      : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-tertiary)]"
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

  const labels: Record<string, string> = { top: "Üst", right: "Sağ", bottom: "Alt", left: "Sol" };

  return (
    <div>
      <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Boşluk (Padding)</label>
      <div className="grid grid-cols-2 gap-3">
        {(["top", "right", "bottom", "left"] as const).map((dir) => (
          <div key={dir} className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-[var(--text-secondary)]">{labels[dir]}</label>
              <span className="text-[10px] text-[var(--accent)] font-mono">{padding[dir]}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={200}
              value={padding[dir]}
              onChange={(e) => update(dir, Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
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
        <label className="text-xs font-medium text-[var(--text-secondary)]">Köşe Yuvarlama</label>
        <span className="text-[10px] text-[var(--accent)] font-mono">{borderRadius}px</span>
      </div>
      <input
        type="range"
        min={0}
        max={64}
        value={borderRadius}
        onChange={(e) => setBorderRadius(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  );
}

function ShadowControls() {
  const shadow = useEditorStore((s) => s.shadow);
  const setShadow = useEditorStore((s) => s.setShadow);
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--text-secondary)] cursor-pointer">
        <div className={`relative w-8 h-4 rounded-full transition-colors ${shadow.enabled ? "bg-[var(--accent)]" : "bg-gray-600"}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${shadow.enabled ? "left-4.5" : "left-0.5"}`} />
        </div>
        <input
          type="checkbox"
          checked={shadow.enabled}
          onChange={(e) => setShadow({ ...shadow, enabled: e.target.checked })}
          className="sr-only"
        />
        Gölge Aktif
      </label>
      {shadow.enabled && (
        <div className="space-y-2 pl-1">
          <SliderControl label="X" value={shadow.x} min={-50} max={50} onChange={(v) => setShadow({ ...shadow, x: v })} />
          <SliderControl label="Y" value={shadow.y} min={-50} max={100} onChange={(v) => setShadow({ ...shadow, y: v })} />
          <SliderControl label="Bulanıklık" value={shadow.blur} min={0} max={200} onChange={(v) => setShadow({ ...shadow, blur: v })} />
        </div>
      )}
    </div>
  );
}

function TransformControls() {
  const t3d = useEditorStore((s) => s.transform3d);
  const setTransform3D = useEditorStore((s) => s.setTransform3D);
  return (
    <div className="space-y-3">
      <SliderControl label="X Ekseni" value={t3d.rotateX} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateX: v })} />
      <SliderControl label="Y Ekseni" value={t3d.rotateY} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateY: v })} />
      <SliderControl label="Perspektif" value={t3d.perspective} min={200} max={2000} onChange={(v) => setTransform3D({ ...t3d, perspective: v })} />
      <SliderControl label="Ölçek" value={t3d.scale * 100} min={50} max={150} onChange={(v) => setTransform3D({ ...t3d, scale: v / 100 })} suffix="%" />
      <button
        onClick={() => setTransform3D({ rotateX: 0, rotateY: 0, rotateZ: 0, perspective: 1000, scale: 1 })}
        className="w-full text-xs font-medium py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
      >
        Sıfırla
      </button>
    </div>
  );
}

function SliderControl({ label, value, min, max, onChange, suffix = "px" }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-medium text-[var(--text-secondary)]">{label}</label>
        <span className="text-[10px] text-[var(--accent)] font-mono tabular-nums">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  );
}
