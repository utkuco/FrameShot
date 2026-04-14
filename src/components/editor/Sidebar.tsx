"use client";

import { useEditorStore } from "@/lib/store";
import { presetGradients, deviceOptions } from "@/types";
import type { GradientConfig, PaddingConfig, DeviceType } from "@/types";
import { Palette, Monitor, Layers, Box, Sparkles, Smartphone, Tablet, Laptop, Globe } from "lucide-react";
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
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ayarlar</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={["background", "device", "padding", "shadow", "transform"]} className="w-full">
          <AccordionItem value="background">
            <AccordionTrigger className="px-5 hover:no-underline">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Palette className="w-4 h-4 text-primary" />
                Arka Plan
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-5 pb-5 space-y-5">
                <GradientSection />
                <PatternSection />
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
                Gölge
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
        <Label className="text-xs text-muted-foreground mb-2 block">Gradient Yönü</Label>
        <div className="flex gap-1">
          {directions.map((d) => (
            <button
              key={d.value}
              onClick={() => setGradient({ ...gradient, direction: d.value as any })}
              className={cn(
                "flex-1 py-1.5 text-xs rounded-md border transition-all",
                gradient.direction === d.value
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Hazır Gradientler</Label>
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
                  isSelected ? "border-primary ring-2 ring-primary/30 scale-105" : "border-transparent hover:border-border"
                )}
                style={{ background: css }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-[10px] text-muted-foreground mb-1 block">Renk 1</Label>
          <input
            type="color"
            value={gradient.colors[0]}
            onChange={(e) => setGradient({ ...gradient, colors: [e.target.value, ...gradient.colors.slice(1)] })}
            className="w-full h-8 rounded-lg border border-input cursor-pointer bg-white"
          />
        </div>
        <div className="flex-1">
          <Label className="text-[10px] text-muted-foreground mb-1 block">Renk 2</Label>
          <input
            type="color"
            value={gradient.colors[1]}
            onChange={(e) => setGradient({ ...gradient, colors: [gradient.colors[0], e.target.value] })}
            className="w-full h-8 rounded-lg border border-input cursor-pointer bg-white"
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
    { key: "none", label: "Yok", icon: "—" },
    { key: "dots", label: "Nokta", icon: "●" },
    { key: "grid", label: "Izgara", icon: "▦" },
    { key: "diagonal", label: "Çapraz", icon: "╲" },
  ];

  return (
    <div>
      <Label className="text-xs text-muted-foreground mb-2 block">Desen</Label>
      <div className="flex gap-1.5">
        {patterns.map((p) => (
          <button
            key={p.key}
            onClick={() => setPattern({ ...pattern, type: p.key as any })}
            className={cn(
              "flex-1 py-2 text-xs font-medium rounded-lg border transition-all",
              pattern.type === p.key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-muted-foreground"
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
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
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
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:border-primary/50 text-muted-foreground bg-white"
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
    { key: "top", label: "Üst" },
    { key: "right", label: "Sağ" },
    { key: "bottom", label: "Alt" },
    { key: "left", label: "Sol" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {dirs.map((d) => (
          <div key={d.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{d.label}</span>
              <span className="text-xs font-mono text-primary">{padding[d.key]}px</span>
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
      <button
        onClick={() => setPadding({ top: 80, right: 80, bottom: 80, left: 80 })}
        className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 rounded-md border border-border hover:border-primary/50 transition-all"
      >
        Sıfırla
      </button>
    </div>
  );
}

function RadiusSection() {
  const borderRadius = useEditorStore((s) => s.borderRadius);
  const setBorderRadius = useEditorStore((s) => s.setBorderRadius);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Köşe Yuvarlaklığı</Label>
        <span className="text-xs font-mono text-primary">{borderRadius}px</span>
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
        <Label className="text-xs text-muted-foreground">Gölge</Label>
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
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className="text-xs font-mono text-primary">{shadow[s.key as keyof typeof shadow]}px</span>
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
    { key: "rotateX", label: "Rotate X", min: -45, max: 45, suffix: "°" },
    { key: "rotateY", label: "Rotate Y", min: -45, max: 45, suffix: "°" },
    { key: "perspective", label: "Perspective", min: 200, max: 2000, suffix: "px" },
    { key: "scale", label: "Scale", min: 50, max: 150, suffix: "%", divisor: 100 },
  ];

  return (
    <div className="space-y-4">
      {controls.map((c) => (
        <div key={c.key} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{c.label}</span>
            <span className="text-xs font-mono text-primary">
              {(c.divisor ? t3d[c.key as keyof typeof t3d] / c.divisor! : t3d[c.key as keyof typeof t3d])}{c.suffix}
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
        className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 rounded-md border border-border hover:border-primary/50 transition-all"
      >
        Sıfırla
      </button>
    </div>
  );
}
