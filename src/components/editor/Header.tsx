"use client";

import { useEditorStore } from "@/lib/store";
import { Download, RotateCcw, Frame, ArrowLeft } from "lucide-react";
import { useCallback } from "react";
import { exportToPNG } from "@/lib/export-utils";
import Link from "next/link";

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
    <header className="h-14 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/90 backdrop-blur-md flex items-center justify-between px-5 flex-shrink-0">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Frame className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          FrameShot
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {imageUrl && (
          <>
            <button
              onClick={() => clearImage()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Yeni Görsel
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-medium transition-all shadow-lg shadow-violet-500/25"
            >
              <Download className="w-3.5 h-3.5" />
              İndir (PNG)
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border-color)] hover:bg-red-500/20 text-red-400 transition-colors"
            >
              Sıfırla
            </button>
          </>
        )}
      </div>
    </header>
  );
}
