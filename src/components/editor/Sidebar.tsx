"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { PaddingConfig, DeviceType } from "@/types";
import {
  Palette,
  Monitor,
  Layers,
  Box,
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  Globe,
  RotateCcw,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-sidebar-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Settings
        </h2>
      </div>
      <Accordion
        type="multiple"
        defaultValue={["background", "device", "padding", "shadow", "transform"]}
        className="flex-1 overflow-y-auto"
      >
        <AccordionItem value="background" className="border-sidebar-border px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              Background
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <GradientPicker />
              <PatternPicker />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="device" className="border-sidebar-border px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              Device Frame
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <DevicePicker />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="padding" className="border-sidebar-border px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Padding & Radius
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <PaddingControls />
              <RadiusControl />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shadow" className="border-sidebar-border px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Shadow
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ShadowControls />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transform" className="border-sidebar-border px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              3D Transform
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <TransformControls />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function GradientPicker() {
  const gradient = useEditorStore((s) => s.backgroundGradient);
  const setGradient = useEditorStore((s) => s.setGradient);
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-2 block">
        Gradient
      </label>
      <div className="grid grid-cols-6 gap-1.5">
        {presetGradients.map((g, i) => {
          const css = `linear-gradient(to right, ${g.colors.join(", ")})`;
          const isSelected = gradient.colors.join() === g.colors.join();
          return (
            <button
              key={i}
              onClick={() => setGradient(g)}
              className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                isSelected
                  ? "border-primary ring-2 ring-primary/30 scale-105"
                  : "border-transparent hover:border-border"
              }`}
              style={{ background: css }}
            />
          );
        })}
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
            Color 1
          </label>
          <input
            type="color"
            value={gradient.colors[0]}
            onChange={(e) =>
              setGradient({
                ...gradient,
                colors: [e.target.value, ...gradient.colors.slice(1)],
              })
            }
            className="w-full h-8 rounded-lg border border-border bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
            Color 2
          </label>
          <input
            type="color"
            value={gradient.colors[1]}
            onChange={(e) =>
              setGradient({
                ...gradient,
                colors: [gradient.colors[0], e.target.value],
              })
            }
            className="w-full h-8 rounded-lg border border-border bg-transparent cursor-pointer"
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
      <label className="text-xs font-medium text-muted-foreground mb-2 block">
        Pattern
      </label>
      <div className="flex gap-1.5">
        {(["none", "dots", "grid", "diagonal"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setPattern({ ...pattern, type: t })}
            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              pattern.type === t
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-ring hover:text-foreground"
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
    Genel: { icon: <Monitor className="w-3 h-3" />, label: "General" },
    Telefon: { icon: <Smartphone className="w-3 h-3" />, label: "Phone" },
    Tablet: { icon: <Tablet className="w-3 h-3" />, label: "Tablet" },
    "Dizüstü": { icon: <Laptop className="w-3 h-3" />, label: "Laptop" },
    Tarayıcı: { icon: <Globe className="w-3 h-3" />, label: "Browser" },
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
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1">
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
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-ring hover:text-foreground"
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
  const update = (key: keyof PaddingConfig, val: number) =>
    setPadding({ ...padding, [key]: val });

  const labels: Record<string, string> = {
    top: "Top",
    right: "Right",
    bottom: "Bottom",
    left: "Left",
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-2 block">
        Padding
      </label>
      <div className="grid grid-cols-2 gap-3">
        {(["top", "right", "bottom", "left"] as const).map((dir) => (
          <div key={dir} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-muted-foreground">
                {labels[dir]}
              </label>
              <span className="text-[11px] text-primary font-mono tabular-nums">
                {padding[dir]}px
              </span>
            </div>
            <Slider
              min={0}
              max={200}
              step={1}
              value={[padding[dir]]}
              onValueChange={([v]) => update(dir, v)}
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">
          Border Radius
        </label>
        <span className="text-[11px] text-primary font-mono tabular-nums">
          {borderRadius}px
        </span>
      </div>
      <Slider
        min={0}
        max={64}
        step={1}
        value={[borderRadius]}
        onValueChange={([v]) => setBorderRadius(v)}
      />
    </div>
  );
}

function ShadowControls() {
  const shadow = useEditorStore((s) => s.shadow);
  const setShadow = useEditorStore((s) => s.setShadow);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground">Shadow Enabled</label>
        <Switch
          checked={shadow.enabled}
          onCheckedChange={(checked) =>
            setShadow({ ...shadow, enabled: checked })
          }
        />
      </div>
      {shadow.enabled && (
        <div className="space-y-3">
          <SliderControl
            label="X Offset"
            value={shadow.x}
            min={-50}
            max={50}
            onChange={(v) => setShadow({ ...shadow, x: v })}
          />
          <SliderControl
            label="Y Offset"
            value={shadow.y}
            min={-50}
            max={100}
            onChange={(v) => setShadow({ ...shadow, y: v })}
          />
          <SliderControl
            label="Blur"
            value={shadow.blur}
            min={0}
            max={200}
            onChange={(v) => setShadow({ ...shadow, blur: v })}
          />
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
      <SliderControl
        label="Rotate X"
        value={t3d.rotateX}
        min={-45}
        max={45}
        onChange={(v) => setTransform3D({ ...t3d, rotateX: v })}
      />
      <SliderControl
        label="Rotate Y"
        value={t3d.rotateY}
        min={-45}
        max={45}
        onChange={(v) => setTransform3D({ ...t3d, rotateY: v })}
      />
      <SliderControl
        label="Perspective"
        value={t3d.perspective}
        min={200}
        max={2000}
        onChange={(v) => setTransform3D({ ...t3d, perspective: v })}
      />
      <SliderControl
        label="Scale"
        value={t3d.scale * 100}
        min={50}
        max={150}
        onChange={(v) => setTransform3D({ ...t3d, scale: v / 100 })}
        suffix="%"
      />
      <button
        onClick={() =>
          setTransform3D({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            perspective: 1000,
            scale: 1,
          })
        }
        className="flex items-center justify-center gap-1.5 w-full text-xs font-medium py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      >
        <RotateCcw className="w-3 h-3" />
        Reset
      </button>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  onChange,
  suffix = "px",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium text-muted-foreground">
          {label}
        </label>
        <span className="text-[11px] text-primary font-mono tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
