"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useEditorStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw } from "lucide-react";

export function CropDialog() {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  const showCropDialog = useEditorStore((s) => s.showCropDialog);
  const setShowCropDialog = useEditorStore((s) => s.setShowCropDialog);
  const setCroppedImageUrl = useEditorStore((s) => s.setCroppedImageUrl);
  const setCropArea = useEditorStore((s) => s.setCropArea);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApply = useCallback(async () => {
    if (!imageUrl || !croppedAreaPixels) return;

    const croppedUrl = await getCroppedImage(imageUrl, croppedAreaPixels);
    setCroppedImageUrl(croppedUrl);
    setCropArea({
      x: croppedAreaPixels.x,
      y: croppedAreaPixels.y,
      width: croppedAreaPixels.width,
      height: croppedAreaPixels.height,
    });
    setShowCropDialog(false);
  }, [imageUrl, croppedAreaPixels, setCroppedImageUrl, setCropArea, setShowCropDialog]);

  const handleCancel = useCallback(() => {
    setShowCropDialog(false);
  }, [setShowCropDialog]);

  const handleReset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCroppedImageUrl(null);
    setCropArea(null);
  }, [setCroppedImageUrl, setCropArea]);

  if (!showCropDialog || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e4e4e7]">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-[#18181b]">Crop Image</h3>
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#71717a]">Aspect:</span>
            {[
              { label: "Free", value: undefined },
              { label: "1:1", value: 1 },
              { label: "16:9", value: 16 / 9 },
              { label: "9:16", value: 9 / 16 },
              { label: "4:3", value: 4 / 3 },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => setAspect(a.value)}
                className={`px-2 py-1 text-[11px] rounded-md border transition-all ${
                  aspect === a.value
                    ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1] font-medium"
                    : "border-[#e4e4e7] text-[#71717a] hover:border-[#6366f1]/50"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleCancel} className="gap-1">
            <X className="w-3.5 h-3.5" />
            Cancel
          </Button>
          <Button size="sm" onClick={handleApply} className="gap-1 bg-[#6366f1] hover:bg-[#818cf8]">
            <Check className="w-3.5 h-3.5" />
            Apply
          </Button>
        </div>
      </div>

      {/* Cropper */}
      <div className="flex-1 relative bg-[#18181b]">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 px-6 py-3 bg-white border-t border-[#e4e4e7]">
        <span className="text-xs text-[#71717a]">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full bg-[#e4e4e7] accent-[#6366f1]"
        />
        <span className="text-xs font-mono text-[#6366f1] w-12 text-right">{zoom.toFixed(2)}x</span>
      </div>
    </div>
  );
}

async function getCroppedImage(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/png");
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
