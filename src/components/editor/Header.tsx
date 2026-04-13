"use client";

import { useEditorStore } from "@/lib/store";
import { Download, RotateCcw, Frame, ArrowLeft, Menu } from "lucide-react";
import { useCallback } from "react";
import { exportToPNG } from "@/lib/export-utils";
import Link from "next/link";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
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
    <header className="h-12 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-between px-3 md:px-4 flex-shrink-0 z-40">
      <div className="flex items-center gap-2">
        {/* Sidebar toggle - mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Link href="/" className="flex items-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6366f1] to-[#a78bfa] flex items-center justify-center">
            <Frame className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent hidden sm:inline">
            FrameShot
          </span>
        </div>
      </div>

      {imageUrl && (
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => clearImage()}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Yeni</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 md:px-4 py-1.5 text-xs rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">İndir</span>
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        </div>
      )}
    </header>
  );
}
