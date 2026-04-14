"use client";

import { useEditorStore } from "@/lib/store";
import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadZone() {
  const setImage = useEditorStore((s) => s.setImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      className="flex flex-col items-center justify-center gap-6 p-8 w-full h-full min-h-[400px]"
    >
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative w-full max-w-lg aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-4",
          isDragging
            ? "border-[#6366f1] bg-[#6366f1]/5 scale-[1.02]"
            : "border-[#d4d4d8] hover:border-[#6366f1] hover:bg-[#6366f1]/5"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200",
            isDragging ? "bg-[#6366f1]/20 scale-110" : "bg-[#f4f4f5] group-hover:bg-[#6366f1]/10"
          )}
        >
          {isDragging ? (
            <FileImage className="w-7 h-7 text-[#6366f1]" />
          ) : (
            <Upload className="w-7 h-7 text-[#71717a]" />
          )}
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-[#18181b]">
            {isDragging ? "Drop!" : "Drag & Drop"}
          </p>
          <p className="text-xs text-[#71717a]">
            or <span className="text-[#6366f1] font-medium">click to browse</span>
          </p>
        </div>

        {/* Supported formats */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-medium text-[#71717a] bg-[#f4f4f5] rounded-md">PNG</span>
          <span className="px-2 py-0.5 text-[10px] font-medium text-[#71717a] bg-[#f4f4f5] rounded-md">JPG</span>
          <span className="px-2 py-0.5 text-[10px] font-medium text-[#71717a] bg-[#f4f4f5] rounded-md">WebP</span>
          <span className="px-2 py-0.5 text-[10px] font-medium text-[#71717a] bg-[#f4f4f5] rounded-md">GIF</span>
        </div>

        {/* Paste hint */}
        <p className="text-[11px] text-[#a1a1aa]">
          Ctrl+V to paste
        </p>
      </div>

      {/* Browse button */}
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
      >
        <ImagePlus className="w-4 h-4" />
        Upload Image
      </button>

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
    </div>
  );
}
