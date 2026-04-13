"use client";

import { useEditorStore } from "@/lib/store";
import { UploadZone } from "./UploadZone";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Editor() {
  const imageUrl = useEditorStore((s) => s.imageUrl);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {imageUrl && (
          <aside className="w-72 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-y-auto flex-shrink-0">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 flex items-center justify-center checkerboard overflow-auto">
          {imageUrl ? <Canvas /> : <UploadZone />}
        </main>
      </div>
    </div>
  );
}

