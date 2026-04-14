import { GradientConfig, PatternConfig, ShadowConfig, PaddingConfig, DeviceType } from "@/types";

export type ExportMode = "full" | "frame-only" | "transparent";

interface ExportOptions {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  backgroundGradient: GradientConfig;
  pattern: PatternConfig;
  shadow: ShadowConfig;
  padding: PaddingConfig;
  borderRadius: number;
  transform3d: { rotateX: number; rotateY: number; scale: number; perspective: number };
  device: DeviceType;
  exportScale: number;
  objectFit: string;
  exportMode: ExportMode;
}

// ============================================================
// IMAGE LOADING
// ============================================================

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ============================================================
// ROUNDED RECT PATH
// ============================================================

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

// ============================================================
// IMAGE DRAWING (contain/cover/fill)
// ============================================================

function drawImageFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, dx: number, dy: number, dw: number, dh: number, objectFit: string) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (objectFit === "fill") {
    ctx.drawImage(img, dx, dy, dw, dh);
  } else if (objectFit === "cover") {
    const scale = Math.max(dw / iw, dh / ih);
    const w = iw * scale, h = ih * scale;
    ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  } else {
    // contain — fill black then draw
    const scale = Math.min(dw / iw, dh / ih);
    const w = iw * scale, h = ih * scale;
    ctx.fillStyle = "#000";
    ctx.fillRect(dx, dy, dw, dh);
    ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  }
}

// ============================================================
// GRADIENT
// ============================================================

function makeGradient(ctx: CanvasRenderingContext2D, w: number, h: number, config: GradientConfig): CanvasGradient {
  let g: CanvasGradient;
  switch (config.direction) {
    case "to-right": g = ctx.createLinearGradient(0, 0, w, 0); break;
    case "to-bottom": g = ctx.createLinearGradient(0, 0, 0, h); break;
    case "to-br": g = ctx.createLinearGradient(0, 0, w, h); break;
    case "to-bl": g = ctx.createLinearGradient(w, 0, 0, h); break;
    case "radial": g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2); break;
    default: g = ctx.createLinearGradient(0, 0, w, h);
  }
  config.colors.forEach((color, i) => {
    g.addColorStop(i / Math.max(config.colors.length - 1, 1), color);
  });
  return g;
}

// ============================================================
// PATTERN
// ============================================================

function drawPattern(ctx: CanvasRenderingContext2D, w: number, h: number, p: PatternConfig) {
  if (p.type === "none") return;
  const hex = Math.round(p.opacity * 255).toString(16).padStart(2, "0");
  const rgba = `${p.color}${hex}`;
  const s = p.scale * 20;
  ctx.save();
  ctx.strokeStyle = rgba;
  ctx.fillStyle = rgba;
  switch (p.type) {
    case "dots":
      for (let x = 0; x < w; x += s) for (let y = 0; y < h; y += s) {
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case "grid":
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      break;
    case "diagonal":
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += s) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke(); }
      break;
  }
  ctx.restore();
}

// ============================================================
// DEVICE FRAMES
// All dimensions are in CSS pixels, matched to DeviceFrame.tsx
// ============================================================

function drawDeviceFrame(ctx: CanvasRenderingContext2D, device: DeviceType, img: HTMLImageElement, objectFit: string) {
  // Determine screen dimensions — scale image to TARGET_SH=400 height
  const TARGET_SH = 400;
  const sh = TARGET_SH;
  const sw = Math.round(sh * (img.naturalWidth / img.naturalHeight));

  if (device === "iphone-15" || device === "iphone-15-pro") {
    const isPro = device === "iphone-15-pro";
    const PAD = 10;
    const ISLAND_H = 32;
    const ISLAND_W_OFFSET = Math.round((sw + PAD * 2) * 0.26); // island width = 48% of frame

    const fw = sw + PAD * 2;
    const fh = sh + PAD * 2 + ISLAND_H + 8; // extra for notch area + home bar
    const sx = PAD;
    const sy = PAD + ISLAND_H + 4;
    const for_ = 40;
    const fir = 30;
    const bodyColor = isPro ? "#1d1d1f" : "#2a2a2e";
    const homeBarW = Math.round(fw * 0.36);

    // Body
    ctx.fillStyle = bodyColor;
    rrect(ctx, 0, 0, fw, fh, for_);
    ctx.fill();

    // Screen (black fill under image)
    ctx.fillStyle = "#000";
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.fill();

    // Screen image clipped
    ctx.save();
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.clip();
    drawImageFit(ctx, img, sx, sy, sw, sh, objectFit);
    ctx.restore();

    // Dynamic Island — sits ABOVE screen, inside the body padding area
    const iw = Math.round(fw * 0.48);
    const ix = (fw - iw) / 2;
    const iy = PAD;
    ctx.fillStyle = bodyColor;
    rrect(ctx, ix, iy, iw, ISLAND_H, ISLAND_H / 2);
    ctx.fill();
    if (isPro) {
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(fw / 2, iy + ISLAND_H / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Home bar
    const hbX = (fw - homeBarW) / 2;
    const hbY = fh - 8;
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    rrect(ctx, hbX, hbY, homeBarW, 3, 2);
    ctx.fill();

  } else if (device === "pixel-8") {
    const PAD = 10;
    const CAM_H = 16;
    const fw = sw + PAD * 2;
    const fh = sh + PAD * 2;
    const sx = PAD;
    const sy = PAD + CAM_H + 4;
    const for_ = 36;
    const fir = 28;

    ctx.fillStyle = "#1a1a1a";
    rrect(ctx, 0, 0, fw, fh, for_);
    ctx.fill();

    ctx.fillStyle = "#000";
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.fill();

    ctx.save();
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.clip();
    drawImageFit(ctx, img, sx, sy, sw, sh, objectFit);
    ctx.restore();

    // Camera pill
    const cw = Math.round(fw * 0.28);
    const cx = (fw - cw) / 2;
    const cy = PAD;
    ctx.fillStyle = "#1a1a1a";
    rrect(ctx, cx, cy, cw, CAM_H, 4);
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(cx + cw / 2, cy + CAM_H / 2, 4, 0, Math.PI * 2);
    ctx.fill();

  } else if (device === "ipad-pro") {
    const PAD = 14;
    const fw = sw + PAD * 2;
    const fh = sh + PAD * 2;
    const sx = PAD;
    const sy = PAD;
    const for_ = 20;
    const fir = 10;

    ctx.fillStyle = "#1d1d1f";
    rrect(ctx, 0, 0, fw, fh, for_);
    ctx.fill();

    ctx.fillStyle = "#000";
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.fill();

    ctx.save();
    rrect(ctx, sx, sy, sw, sh, fir);
    ctx.clip();
    drawImageFit(ctx, img, sx, sy, sw, sh, objectFit);
    ctx.restore();

  } else if (device === "macbook-pro") {
    const PAD = 16;
    const CAM_R = 8;
    const BASE_OH = 40;
    const BASE_H = 16;

    const fw = sw + PAD * 2;
    const fh = sh + PAD * 2 + CAM_R * 2;
    const sx = PAD;
    const sy = PAD + CAM_R * 2 + 2;
    const for_ = 12;
    const baseW = fw + BASE_OH;

    // Screen housing
    ctx.fillStyle = "#1d1d1f";
    rrect(ctx, 0, 0, fw, fh, for_);
    ctx.fill();

    // Camera
    ctx.fillStyle = "#3a3a3c";
    ctx.beginPath();
    ctx.arc(fw / 2, CAM_R, CAM_R - 1, 0, Math.PI * 2);
    ctx.fill();

    // Screen
    ctx.fillStyle = "#000";
    ctx.fillRect(sx, sy, sw, sh);
    ctx.save();
    ctx.beginPath();
    ctx.rect(sx, sy, sw, sh);
    ctx.clip();
    drawImageFit(ctx, img, sx, sy, sw, sh, objectFit);
    ctx.restore();

    // Base
    const baseX = (fw - baseW) / 2;
    const baseY = fh;
    const baseGrad = ctx.createLinearGradient(baseX, baseY, baseX, baseY + BASE_H);
    baseGrad.addColorStop(0, "#3a3a3c");
    baseGrad.addColorStop(1, "#2a2a2e");
    ctx.fillStyle = baseGrad;
    rrect(ctx, baseX, baseY, baseW, BASE_H, 4);
    ctx.fill();

    // Hinge
    ctx.fillStyle = "#555";
    ctx.fillRect(fw / 2 - 20, baseY + 4, 40, 2);

  } else if (device === "browser-chrome" || device === "browser-safari" || device === "browser-firefox") {
    const TAB_H = 36;
    const fw = sw;
    const fh = sh + TAB_H;
    const dotColors = device === "browser-firefox"
      ? (["#ff6134", "#ffbd4f", "#28c840"] as [string, string, string])
      : (["#ff5f57", "#febc2e", "#28c840"] as [string, string, string]);
    const bgColor = device === "browser-safari" ? "#f5f5f7"
      : device === "browser-chrome" ? "#202124" : "#1c1b22";
    const urlBg = device === "browser-safari" ? "#ffffff"
      : device === "browser-chrome" ? "#35363a" : "#2b2a33";
    const urlText = device === "browser-safari" ? "#6e6e73"
      : device === "browser-chrome" ? "#9aa0a6" : "#9aa0a6";

    // Tab bar + rounded top
    ctx.fillStyle = bgColor;
    rrect(ctx, 0, 0, fw, fh, 12);
    ctx.fill();
    ctx.fillRect(0, TAB_H - 2, fw, 2);

    // Traffic lights
    const dotY = TAB_H / 2;
    dotColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(16 + i * 16, dotY, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // URL bar
    ctx.fillStyle = urlBg;
    rrect(ctx, 62, dotY - 8, fw - 76, 16, 4);
    ctx.fill();
    ctx.fillStyle = urlText;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("example.com", 62 + (fw - 76) / 2, dotY + 3);

    // White screen area
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, TAB_H, fw, sh);

    // Screen clipped
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, TAB_H, fw, sh);
    ctx.clip();
    drawImageFit(ctx, img, 0, TAB_H, fw, sh, objectFit);
    ctx.restore();

  } else {
    // No device — draw raw image
    ctx.drawImage(img, 0, 0, sw, sh);
  }
}

// ============================================================
// EXPORT
// ============================================================

export async function exportToPNG(options: ExportOptions): Promise<void> {
  const { imageUrl, padding, borderRadius, exportScale, exportMode, device } = options;
  const img = await loadImage(imageUrl);

  const hasDevice = device !== "none";
  const hasBg = exportMode === "full";
  const isTransparent = exportMode === "transparent";

  // Screen pixel size (target 400px height)
  const TARGET_SH = 400;
  const screenH = TARGET_SH;
  const screenW = Math.round(screenH * (img.naturalWidth / img.naturalHeight));

  // Frame overhead per device type
  let frameW: number, frameH: number;
  if (!hasDevice) {
    frameW = screenW;
    frameH = screenH;
  } else if (device === "iphone-15" || device === "iphone-15-pro") {
    const PAD = 10;
    frameW = screenW + PAD * 2;
    frameH = screenH + PAD * 2 + 32 + 8 + 3; // pad + island + gap + home bar
  } else if (device === "pixel-8") {
    const PAD = 10;
    frameW = screenW + PAD * 2;
    frameH = screenH + PAD * 2 + 20;
  } else if (device === "ipad-pro") {
    const PAD = 14;
    frameW = screenW + PAD * 2;
    frameH = screenH + PAD * 2;
  } else if (device === "macbook-pro") {
    const PAD = 16;
    frameW = screenW + PAD * 2;
    frameH = screenH + PAD * 2 + 18 + 16; // pad + camera notch + base
  } else {
    // browser
    const TAB_H = 36;
    frameW = screenW;
    frameH = screenH + TAB_H;
  }

  const padL = hasBg ? padding.left : 0;
  const padR = hasBg ? padding.right : 0;
  const padT = hasBg ? padding.top : 0;
  const padB = hasBg ? padding.bottom : 0;

  const totalW = frameW + padL + padR;
  const totalH = frameH + padT + padB;
  const scale = Math.min(exportScale || 1, 2);

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(totalW * scale);
  canvas.height = Math.round(totalH * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Shadow
  if (hasBg && options.shadow.enabled) {
    ctx.save();
    ctx.shadowOffsetX = options.shadow.x;
    ctx.shadowOffsetY = options.shadow.y;
    ctx.shadowBlur = options.shadow.blur;
    ctx.shadowColor = options.shadow.color;
    rrect(ctx, padL, padT, frameW, frameH, Math.min(borderRadius, 20));
    ctx.fillStyle = "rgba(0,0,0,0.01)";
    ctx.fill();
    ctx.restore();
  }

  // Background
  if (hasBg) {
    ctx.save();
    rrect(ctx, 0, 0, totalW, totalH, Math.min(borderRadius, 20));
    ctx.clip();
    ctx.fillStyle = makeGradient(ctx, totalW, totalH, options.backgroundGradient);
    ctx.fillRect(0, 0, totalW, totalH);
    drawPattern(ctx, totalW, totalH, options.pattern);
    ctx.restore();
  }

  // Border-radius clip for transparent mode
  if (isTransparent && borderRadius > 0) {
    ctx.save();
    rrect(ctx, padL, padT, frameW, frameH, Math.min(borderRadius, 20));
    ctx.clip();
  }

  // Draw content
  ctx.save();
  ctx.translate(padL, padT);
  drawDeviceFrame(ctx, device, img, options.objectFit);
  ctx.restore();

  if (isTransparent && borderRadius > 0) {
    ctx.restore();
  }

  const link = document.createElement("a");
  const suffix = exportMode === "frame-only" ? "-frame" : exportMode === "transparent" ? "-transparent" : "";
  link.download = `frameshot${suffix}-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png", 0.92);
  link.click();
}
