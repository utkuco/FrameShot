"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { GradientConfig, PaddingConfig, DeviceType, ObjectFitType } from "@/types";
import { Palette, Monitor, Layers, Box, Sparkles, Smartphone, Tablet, Laptop, Globe, Maximize } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={["background", "fit", "device", "padding", "shadow", "transform"]} className="w-full">
          <AccordionItem value="background">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Palette className="w-4 h-4 text-primary" />
                Background
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5 space-y-5">
                <GradientSection />
                <PatternSection />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fit">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Maximize className="w-4 h-4 text-primary" />
                Fit & Size
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5">
                <FitSection />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="device">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Monitor className="w-4 h-4 text-primary" />
                Cihaz Frame
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5">
                <DeviceSection />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="padding">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Layers className="w-4 h-4 text-primary" />
                Padding & Radius
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5 space-y-5">
                <PaddingSection />
                <RadiusSection />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shadow">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Box className="w-4 h-4 text-primary" />
                Shadow
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5">
                <ShadowSection />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transform">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                3D Dönüşüm
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5">
                <TransformSection />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function FitSection() {
  const objectFit = useEditorStore((s) => s.objectFit);
  const setObjectFit = useEditorStore((s) => s.setObjectFit);

  const fitOptions: { key: ObjectFitType; label: string; desc: string }[] = [
    { key: "contain", label: "Contain", desc: "Full image visible, may have empty space" },
    { key: "cover", label: "Cover", desc: "Fills the area, edges may crop" },
    { key: "fill", label: "Fill", desc: "Stretches to fill frame" },
  ];

  return (
    <div className="space-y-2">
      {fitOptions.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setObjectFit(opt.key)}
          className={cn(
            "w-full text-left px-3 py-2.5 rounded-xl border transition-all",
            objectFit === opt.key
              ? "border-[#6366f1] bg-[#6366f1]/5"
              : "border-[#e4e4e7] hover:border-[#6366f1]/30 bg-white"
          )}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold",
              objectFit === opt.key ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]" : "border-[#d4d4d8] text-[#a1a1aa]"
            )}>
              {opt.key === "contain" ? "⊡" : opt.key === "cover" ? "⊞" : "⟷"}
            </div>
            <div>
              <p className={cn("text-xs font-medium", objectFit === opt.key ? "text-[#6366f1]" : "text-[#3f3f46]")}>
                {opt.label}
              </p>
              <p className="text-[10px] text-[#a1a1aa]">{opt.desc}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function GradientSection() {
  const gradient = useEditorStore((s) => s.backgroundGradient);
  const setGradient = useEditorStore((s) => s.setGradient);
  const directions = [
    { label: "→", value: "to-right" },
    { label: "↓", value: "to-bottom" },
    { label: "↘", value: "to-br" },
    { label: "↙", value: "to-bl" },
    { label: "○", value: "radial" },
  ];

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Gradient Direction</Label>
        <div className="flex gap-1">
          {directions.map((d) => (
            <button
              key={d.value}
              onClick={() => setGradient({ ...gradient, direction: d.value as any })}
              className={cn(
                "flex-1 py-1.5 text-xs rounded-md border transition-all",
                gradient.direction === d.value
                  ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1] font-medium"
                  : "border-[#e4e4e7] hover:border-[#6366f1]/50 text-[#71717a]"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Preset Gradients</Label>
        <div className="grid grid-cols-6 gap-1.5">
          {presetGradients.map((g, i) => {
            const css = `linear-gradient(${g.direction === 'to-br' ? '135deg' : g.direction === 'to-right' ? '90deg' : '180deg'}, ${g.colors.join(', ')})`;
            const isSelected = gradient.colors.join() === g.colors.join();
            return (
              <button
                key={i}
                onClick={() => setGradient(g)}
                className={cn(
                  "w-full aspect-square rounded-lg border-2 transition-all hover:scale-105",
                  isSelected ? "border-[#6366f1] ring-2 ring-[#6366f1]/30 scale-105" : "border-transparent hover:border-[#e4e4e7]"
                )}
                style={{ background: css }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] text-muted-foreground mb-1 block">Color 1</Label>
          <input
            type="color"
            value={gradient.colors[0]}
            onChange={(e) => setGradient({ ...gradient, colors: [e.target.value, ...gradient.colors.slice(1)] })}
            className="w-full h-8 rounded-lg border border-[#e4e4e7] cursor-pointer bg-white"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] text-muted-foreground mb-1 block">Color 2</Label>
          <input
            type="color"
            value={gradient.colors[1]}
            onChange={(e) => setGradient({ ...gradient, colors: [gradient.colors[0], e.target.value] })}
            className="w-full h-8 rounded-lg border border-[#e4e4e7] cursor-pointer bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function PatternSection() {
  const pattern = useEditorStore((s) => s.pattern);
  const setPattern = useEditorStore((s) => s.setPattern);
  const patterns = [
    { key: "none", label: "None", icon: "—" },
    { key: "dots", label: "Nokta", icon: "●" },
    { key: "grid", label: "Izgara", icon: "▦" },
    { key: "diagonal", label: "Çapraz", icon: "╲" },
  ];

  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-2 block">Pattern</Label>
      <div className="flex gap-1.5">
        {patterns.map((p) => (
          <button
            key={p.key}
            onClick={() => setPattern({ ...pattern, type: p.key as any })}
            className={cn(
              "flex-1 py-2 text-xs font-medium rounded-lg border transition-all",
              pattern.type === p.key
                ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                : "border-[#e4e4e7] hover:border-[#6366f1]/50 text-[#71717a]"
            )}
          >
            <span className="text-base">{p.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DeviceSection() {
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);

  const categories = [
    { key: "Genel", icon: <Monitor className="w-3 h-3" /> },
    { key: "Telefon", icon: <Smartphone className="w-3 h-3" /> },
    { key: "Tablet", icon: <Tablet className="w-3 h-3" /> },
    { key: "Dizüstü", icon: <Laptop className="w-3 h-3" /> },
    { key: "Tarayıcı", icon: <Globe className="w-3 h-3" /> },
  ];

  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const items = deviceOptions.filter((d) => d.category === cat.key);
        if (items.length === 0) return null;
        return (
          <div key={cat.key}>
            <p className="text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              {cat.icon}
              {cat.key}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((d) => (
                <button
                  key={d.type}
                  onClick={() => setDevice(d.type as DeviceType)}
                  className={cn(
                    "px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all",
                    device === d.type
                      ? "border-[#6366f1] bg-[#6366f1] text-white"
                      : "border-[#e4e4e7] hover:border-[#6366f1]/50 text-[#71717a] bg-white"
                  )}
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

function PaddingSection() {
  const padding = useEditorStore((s) => s.padding);
  const setPadding = useEditorStore((s) => s.setPadding);
  const update = (key: keyof PaddingConfig, val: number) => setPadding({ ...padding, [key]: val });
  const dirs: { key: keyof PaddingConfig; label: string }[] = [
    { key: "top", label: "Top" },
    { key: "right", label: "Right" },
    { key: "bottom", label: "Bottom" },
    { key: "left", label: "Left" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {dirs.map((d) => (
          <div key={d.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#71717a]">{d.label}</span>
              <span className="text-xs font-mono text-[#6366f1]">{padding[d.key]}px</span>
            </div>
            <Slider
              value={[padding[d.key]]}
              onValueChange={([v]) => update(d.key, v)}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusSection() {
  const borderRadius = useEditorStore((s) => s.borderRadius);
  const setBorderRadius = useEditorStore((s) => s.setBorderRadius);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-[#71717a]">Corner Radius</Label>
        <span className="text-xs font-mono text-[#6366f1]">{borderRadius}px</span>
      </div>
      <Slider
        value={[borderRadius]}
        onValueChange={([v]) => setBorderRadius(v)}
        min={0}
        max={64}
        step={1}
        className="w-full"
      />
    </div>
  );
}

function ShadowSection() {
  const shadow = useEditorStore((s) => s.shadow);
  const setShadow = useEditorStore((s) => s.setShadow);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-[#71717a]">Shadow</Label>
        <Switch
          checked={shadow.enabled}
          onCheckedChange={(checked) => setShadow({ ...shadow, enabled: checked })}
        />
      </div>
      {shadow.enabled && (
        <div className="space-y-3">
          {[
            { key: "x", label: "X", min: -50, max: 50 },
            { key: "y", label: "Y", min: -50, max: 100 },
            { key: "blur", label: "Blur", min: 0, max: 200 },
          ].map((s) => (
            <div key={s.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#71717a]">{s.label}</span>
                <span className="text-xs font-mono text-[#6366f1]">{shadow[s.key as keyof typeof shadow]}px</span>
              </div>
              <Slider
                value={[shadow[s.key as keyof typeof shadow] as number]}
                onValueChange={([v]) => setShadow({ ...shadow, [s.key]: v })}
                min={s.min}
                max={s.max}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TransformSection() {
  const t3d = useEditorStore((s) => s.transform3d);
  const setTransform3D = useEditorStore((s) => s.setTransform3D);

  const controls = [
    { key: "rotateX", label: "Rotate X", min: -30, max: 30, suffix: "°" },
    { key: "rotateY", label: "Rotate Y", min: -30, max: 30, suffix: "°" },
    { key: "perspective", label: "Perspective", min: 300, max: 1500, suffix: "px" },
    { key: "scale", label: "Scale", min: 50, max: 150, suffix: "%", divisor: 100 },
  ];

  return (
    <div className="space-y-4">
      {controls.map((c) => (
        <div key={c.key} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71717a]">{c.label}</span>
            <span className="text-xs font-mono text-[#6366f1]">
              {(c.divisor ? (t3d[c.key as keyof typeof t3d] as number) * c.divisor : t3d[c.key as keyof typeof t3d])}{c.suffix}
            </span>
          </div>
          <Slider
            value={[c.divisor ? (t3d[c.key as keyof typeof t3d] as number) * c.divisor : t3d[c.key as keyof typeof t3d] as number]}
            onValueChange={([v]) => setTransform3D({ ...t3d, [c.key]: c.divisor ? v / c.divisor! : v })}
            min={c.min}
            max={c.max}
            step={1}
            className="w-full"
          />
        </div>
      ))}
      <button
        onClick={() => setTransform3D({ rotateX: 0, rotateY: 0, rotateZ: 0, perspective: 1000, scale: 1 })}
        className="w-full text-xs text-[#71717a] hover:text-[#18181b] py-1.5 rounded-md border border-[#e4e4e7] hover:border-[#6366f1]/50 transition-all"
      >
        Reset
      </button>
    </div>
  );
}
