"use client";

import { useEditorStore } from "@/lib/store";
import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      onPaste={handlePaste}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="flex flex-col items-center justify-center gap-6 p-8 w-full h-full min-h-[400px]"
    >
      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full max-w-lg aspect-[4/3] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all group ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            isDragging
              ? "bg-primary/20"
              : "bg-secondary group-hover:bg-primary/10"
          }`}
        >
          <Upload
            className={`w-7 h-7 transition-colors ${
              isDragging
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-medium text-foreground">
            Drag & drop your screenshot or{" "}
            <span className="text-primary font-semibold">click to browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">
            PNG, JPG, WebP supported
          </p>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-[11px] font-medium">
            <Keyboard className="w-3 h-3" />
            Ctrl+V to paste
          </div>
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

      <Button onClick={() => inputRef.current?.click()} size="lg">
        <ImagePlus className="w-4 h-4" />
        Upload Image
      </Button>
    </div>
  );
}
