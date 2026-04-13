"use client";

import { useEditorStore } from "@/lib/store";
import { useCallback, useRef } from "react";
import { Upload, ImagePlus } from "lucide-react";

export function UploadZone() {
  const setImage = useEditorStore((s) => s.setImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImage(url, img.naturalWidth, img.naturalHeight);
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    },
    [setImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          handleFile(items[i].getAsFile()!);
          break;
        }
      }
    },
    [handleFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onPaste={handlePaste}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center gap-6 p-12 w-full h-full min-h-[500px]"
    >
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full max-w-lg aspect-[4/3] border-2 border-dashed border-[var(--border-color)] rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group"
      >
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
          <Upload className="w-8 h-8 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Sürükle & Bırak veya <span className="text-[var(--accent)]">Tıkla</span>
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            PNG, JPG, WebP • Yapıştır (Ctrl+V) destekli
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
      >
        <ImagePlus className="w-5 h-5" />
        Görsel Yükle
      </button>
    </div>
  );
}
