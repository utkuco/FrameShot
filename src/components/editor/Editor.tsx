"use client";

import { useEditorStore } from "@/lib/store";
import { UploadZone } from "./UploadZone";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) setSidebarOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out z-20 ${
            sidebarOpen ? "w-72" : "w-0"
          } fixed md:relative h-[calc(100vh-48px)] md:h-auto`}
        >
          <div className={`w-72 ${sidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
            <Sidebar />
          </div>
        </aside>

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
