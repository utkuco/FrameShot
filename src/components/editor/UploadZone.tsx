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
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-8 w-full h-full min-h-[300px]"
    >
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full max-w-xs sm:max-w-md aspect-[4/3] border-2 border-dashed border-[var(--border-color)] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" />
        </div>
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
            Sürükle & Bırak veya <span className="text-[var(--accent)]">Tıkla</span>
          </p>
          <p className="text-[10px] sm:text-xs text-[var(--text-tertiary)] mt-1">
            PNG, JPG, WebP · Ctrl+V
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
        className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors"
      >
        <ImagePlus className="w-4 h-4" />
        Görsel Yükle
      </button>
    </div>
  );
}
