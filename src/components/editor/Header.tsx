"use client";

import { useEditorStore, type ExportMode } from "@/lib/store";
import { Download, RotateCcw, Frame, ArrowLeft, Menu, Crop, Undo2, ChevronDown } from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { exportToPNG } from "@/lib/export-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const exportModes: { key: ExportMode; label: string; shortLabel: string }[] = [
  { key: "full", label: "With Background", shortLabel: "Full" },
  { key: "frame-only", label: "Device Frame Only", shortLabel: "Frame" },
  { key: "transparent", label: "Transparent Background", shortLabel: "Transp." },
];

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  const croppedImageUrl = useEditorStore((s) => s.croppedImageUrl);
  const reset = useEditorStore((s) => s.reset);
  const clearImage = useEditorStore((s) => s.clearImage);
  const setShowCropDialog = useEditorStore((s) => s.setShowCropDialog);
  const setCroppedImageUrl = useEditorStore((s) => s.setCroppedImageUrl);
  const exportMode = useEditorStore((s) => s.exportMode);
  const setExportMode = useEditorStore((s) => s.setExportMode);

  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleExport = useCallback(async () => {
    const state = useEditorStore.getState();
    if (!state.imageUrl) return;
    try {
      await exportToPNG({
        imageUrl: state.croppedImageUrl || state.imageUrl,
        imageWidth: state.imageWidth,
        imageHeight: state.imageHeight,
        backgroundGradient: state.backgroundGradient,
        pattern: state.pattern,
        shadow: state.shadow,
        padding: state.padding,
        borderRadius: state.borderRadius,
        transform3d: state.transform3d,
        device: state.device,
        exportScale: state.exportScale,
        objectFit: state.objectFit,
        exportMode: state.exportMode,
      });
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  const currentMode = exportModes.find((m) => m.key === exportMode)!;

  return (
    <header className="h-12 border-b border-[#e4e4e7] bg-white flex items-center justify-between px-4 flex-shrink-0 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Link href="/" className="flex items-center text-[#71717a] hover:text-[#18181b] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-sm">
            <Frame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
            FrameShot
          </span>
        </div>
      </div>

      {imageUrl && (
        <div className="flex items-center gap-2">
          {/* Crop button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCropDialog(true)}
            className={`gap-1.5 ${croppedImageUrl ? "border-[#6366f1] text-[#6366f1] bg-[#6366f1]/5" : ""}`}
          >
            <Crop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Crop</span>
          </Button>

          {/* Undo crop */}
          {croppedImageUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCroppedImageUrl(null)}
              className="gap-1.5 text-amber-600 border-amber-200 hover:bg-amber-50"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Undo Crop</span>
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => clearImage()} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </Button>

          {/* Export dropdown */}
          <div className="relative" ref={menuRef}>
            <div className="flex items-center">
              <Button
                size="sm"
                onClick={handleExport}
                className="gap-1.5 bg-[#6366f1] hover:bg-[#818cf8] rounded-r-none border-r border-[#818cf8]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-2 py-2 bg-[#6366f1] hover:bg-[#818cf8] text-white rounded-r-lg border-l border-[#818cf8] transition-colors"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Dropdown */}
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-[#e4e4e7] rounded-xl shadow-xl z-50 py-1.5 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
                  Export Mode
                </div>
                {exportModes.map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => { setExportMode(mode.key); setShowExportMenu(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs transition-colors",
                      exportMode === mode.key
                        ? "bg-[#6366f1]/10 text-[#6366f1] font-medium"
                        : "text-[#3f3f46] hover:bg-[#f4f4f5]"
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
          >
            Reset
          </Button>
        </div>
      )}
    </header>
  );
}
