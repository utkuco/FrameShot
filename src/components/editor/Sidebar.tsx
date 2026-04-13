"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { GradientConfig, PaddingConfig, DeviceType } from "@/types";
import { Palette, Monitor, Layers, Box, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  return (
    <div className="flex flex-col divide-y divide-[var(--border-color)]">
      <Section icon={<Palette className="w-4 h-4" />} title="Arka Plan">
        <GradientPicker />
        <PatternPicker />
      </Section>
      <Section icon={<Monitor className="w-4 h-4" />} title="Cihaz Cercevesi">
        <DevicePicker />
      </Section>
      <Section icon={<Layers className="w-4 h-4" />} title="Bosluk & Kose">
        <PaddingControls />
        <RadiusControl />
      </Section>
      <Section icon={<Box className="w-4 h-4" />} title="Golge">
        <ShadowControls />
      </Section>
      <Section icon={<Sparkles className="w-4 h-4" />} title="3D Donusum">
        <TransformControls />
      </Section>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-3">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2">
        <span className="flex items-center gap-2">{icon}{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="space-y-3">{children}</div>}
    </div>
  );
}

function GradientPicker() {
  const gradient = useEditorStore((s) => s.backgroundGradient);
  const setGradient = useEditorStore((s) => s.setGradient);
  return (
    <div>
      <label className="text-xs text-[var(--text-secondary)] mb-2 block">Gradyan</label>
      <div className="grid grid-cols-6 gap-1.5">
        {presetGradients.map((g, i) => {
          const css = `linear-gradient(to right, ${g.colors.join(", ")})`;
          return (
            <button key={i} onClick={() => setGradient(g)}
              className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-110 ${gradient.colors.join() === g.colors.join() ? "border-white" : "border-transparent"}`}
              style={{ background: css }}
            />
          );
        })}
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <label className="text-[10px] text-[var(--text-secondary)]">Renk 1</label>
          <input type="color" value={gradient.colors[0]}
            onChange={(e) => setGradient({ ...gradient, colors: [e.target.value, ...gradient.colors.slice(1)] })}
            className="w-full h-8 rounded border border-[var(--border-color)] bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-[var(--text-secondary)]">Renk 2</label>
          <input type="color" value={gradient.colors[1]}
            onChange={(e) => setGradient({ ...gradient, colors: [gradient.colors[0], e.target.value] })}
            className="w-full h-8 rounded border border-[var(--border-color)] bg-transparent cursor-pointer"
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
      <label className="text-xs text-[var(--text-secondary)] mb-1 block">Desen</label>
      <div className="flex gap-1.5">
        {(["none", "dots", "grid", "diagonal"] as const).map((t) => (
          <button key={t} onClick={() => setPattern({ ...pattern, type: t })}
            className={`px-2 py-1 text-[10px] rounded-md border transition-colors ${pattern.type === t ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]" : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]"}`}
          >
            {t === "none" ? "Yok" : t === "dots" ? "\u25cf" : t === "grid" ? "\u25a6" : "\u2572"}
          </button>
        ))}
      </div>
    </div>
  );
}

function DevicePicker() {
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);
  const categories = ["Genel", "Telefon", "Tablet", "Dizustu", "Tarayici"];
  return (
    <div className="space-y-2">
      {categories.map((cat) => {
        const items = deviceOptions.filter((d) => d.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">{cat}</p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((d) => (
                <button key={d.type} onClick={() => setDevice(d.type as DeviceType)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${device === d.type ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]" : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)]"}`}
                >{d.name}</button>
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
  return (
    <div>
      <label className="text-xs text-[var(--text-secondary)] mb-1 block">Bosluk (Padding)</label>
      <div className="grid grid-cols-2 gap-2">
        {(["top", "right", "bottom", "left"] as const).map((dir) => (
          <div key={dir}>
            <label className="text-[10px] text-[var(--text-secondary)] capitalize">{dir === "top" ? "Ust" : dir === "right" ? "Sag" : dir === "bottom" ? "Alt" : "Sol"}</label>
            <input type="range" min={0} max={200} value={padding[dir]} onChange={(e) => update(dir, Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">{padding[dir]}px</span>
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
      <label className="text-xs text-[var(--text-secondary)] mb-1 block">Kose Yuvarlama</label>
      <input type="range" min={0} max={64} value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
      <span className="text-[10px] text-[var(--text-secondary)]">{borderRadius}px</span>
    </div>
  );
}

function ShadowControls() {
  const shadow = useEditorStore((s) => s.shadow);
  const setShadow = useEditorStore((s) => s.setShadow);
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
        <input type="checkbox" checked={shadow.enabled} onChange={(e) => setShadow({ ...shadow, enabled: e.target.checked })} className="accent-[var(--accent)]" />
        Golge Aktif
      </label>
      {shadow.enabled && (
        <>
          <SliderControl label="X" value={shadow.x} min={-50} max={50} onChange={(v) => setShadow({ ...shadow, x: v })} />
          <SliderControl label="Y" value={shadow.y} min={-50} max={100} onChange={(v) => setShadow({ ...shadow, y: v })} />
          <SliderControl label="Bulaniklik" value={shadow.blur} min={0} max={200} onChange={(v) => setShadow({ ...shadow, blur: v })} />
        </>
      )}
    </div>
  );
}

function TransformControls() {
  const t3d = useEditorStore((s) => s.transform3d);
  const setTransform3D = useEditorStore((s) => s.setTransform3D);
  return (
    <div className="space-y-2">
      <SliderControl label="X Ekseni" value={t3d.rotateX} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateX: v })} />
      <SliderControl label="Y Ekseni" value={t3d.rotateY} min={-45} max={45} onChange={(v) => setTransform3D({ ...t3d, rotateY: v })} />
      <SliderControl label="Perspektif" value={t3d.perspective} min={200} max={2000} onChange={(v) => setTransform3D({ ...t3d, perspective: v })} />
      <SliderControl label="Olcek" value={t3d.scale * 100} min={50} max={150} onChange={(v) => setTransform3D({ ...t3d, scale: v / 100 })} suffix="%" />
      <button onClick={() => setTransform3D({ rotateX: 0, rotateY: 0, rotateZ: 0, perspective: 1000, scale: 1 })}
        className="w-full text-xs py-1.5 rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        Sifirla
      </button>
    </div>
  );
}

function SliderControl({ label, value, min, max, onChange, suffix = "px" }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[10px] text-[var(--text-secondary)]">{label}</label>
        <span className="text-[10px] text-[var(--text-secondary)]">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
    </div>
  );
}

