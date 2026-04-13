"use client";

import { useEditorStore } from "@/lib/store";
import { UploadZone } from "./UploadZone";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-80" : "w-0"
          }`}
        >
          <div className={`w-80 ${sidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
            <Sidebar />
          </div>
        </aside>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-3 left-3 z-10 p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/50 transition-all text-[var(--text-secondary)] hover:text-[var(--accent)]"
          style={{ left: sidebarOpen ? "308px" : "12px" }}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>

        {/* Main canvas */}
        <main className="flex-1 flex items-center justify-center checkerboard overflow-auto">
          <CanvasOrUpload />
        </main>
      </div>
    </div>
  );
}

function CanvasOrUpload() {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  return imageUrl ? <Canvas /> : <UploadZone />;
}
