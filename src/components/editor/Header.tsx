"use client";

import { useEditorStore } from "@/lib/store";
import { Download, RotateCcw, ImageIcon } from "lucide-react";
import { useCallback } from "react";
import { exportToPNG } from "@/lib/export-utils";

export function Header() {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  const reset = useEditorStore((s) => s.reset);
  const clearImage = useEditorStore((s) => s.clearImage);

  const handleExport = useCallback(async () => {
    const state = useEditorStore.getState();
    if (!state.imageUrl) return;

    try {
      await exportToPNG({
        imageUrl: state.imageUrl,
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
      });
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  return (
    <header className="h-14 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <ImageIcon className="w-6 h-6 text-[var(--accent)]" />
        <h1 className="text-lg font-bold tracking-tight">Screenshot Beautifier</h1>
      </div>

      {imageUrl && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => clearImage()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Yeni Görsel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            İndir (PNG)
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border-color)] hover:bg-red-500/20 text-red-400 transition-colors"
          >
            Sıfırla
          </button>
        </div>
      )}
    </header>
  );
}
