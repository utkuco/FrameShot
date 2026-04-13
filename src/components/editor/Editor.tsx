"use client";

import { useEditorStore } from "@/lib/store";
import { UploadZone } from "./UploadZone";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Editor() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-y-auto flex-shrink-0">
          <Sidebar />
        </aside>
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
