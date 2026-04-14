import { GradientConfig, PatternConfig, ShadowConfig, PaddingConfig, Transform3DConfig, DeviceType } from "@/types";

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
  transform3d: Transform3DConfig;
  device: DeviceType;
  exportScale: number;
  objectFit: string;
  exportMode: ExportMode;
}

function createGradient(ctx: CanvasRenderingContext2D, w: number, h: number, config: GradientConfig): CanvasGradient {
  let gradient: CanvasGradient;
  switch (config.direction) {
    case "to-right": gradient = ctx.createLinearGradient(0, 0, w, 0); break;
    case "to-bottom": gradient = ctx.createLinearGradient(0, 0, 0, h); break;
    case "to-br": gradient = ctx.createLinearGradient(0, 0, w, h); break;
    case "to-bl": gradient = ctx.createLinearGradient(w, 0, 0, h); break;
    case "radial": gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2); break;
    default: gradient = ctx.createLinearGradient(0, 0, w, h);
  }
  config.colors.forEach((color, i) => {
    gradient.addColorStop(i / Math.max(config.colors.length - 1, 1), color);
  });
  return gradient;
}

function drawPattern(ctx: CanvasRenderingContext2D, w: number, h: number, pattern: PatternConfig) {
  if (pattern.type === "none") return;
  const hex = Math.round(pattern.opacity * 255).toString(16).padStart(2, "0");
  const rgba = `${pattern.color}${hex}`;
  const s = pattern.scale * 20;
  ctx.save();
  ctx.strokeStyle = rgba;
  ctx.fillStyle = rgba;

  switch (pattern.type) {
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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

function getNaturalScreenSize(device: DeviceType, imgW: number, imgH: number): { sw: number; sh: number } {
  const targetH = 400;
  const scale = targetH / Math.max(imgH, 1);
  const sw = Math.round(imgW * scale);
  const sh = Math.round(imgH * scale);
  return { sw, sh };
}

function drawDeviceFrame(ctx: CanvasRenderingContext2D, device: DeviceType, img: HTMLImageElement, objectFit: string, destX: number, destY: number) {
  const { sw, sh } = getNaturalScreenSize(device, img.naturalWidth, img.naturalHeight);

  switch (device) {
    case "iphone-15":
    case "iphone-15-pro": {
      const pad = 12;
      const bodyW = sw + pad * 2;
      const bodyH = sh + pad * 2 + 16;
      const r = 40;
      const notchW = sw * 0.38;
      const notchH = 18;

      // Body
      ctx.fillStyle = device === "iphone-15-pro" ? "#1d1d1f" : "#2a2a2e";
      roundRectPath(ctx, destX, destY, bodyW, bodyH, r);
      ctx.fill();

      // Screen cutout (black area)
      const scrX = destX + pad;
      const scrY = destY + pad + notchH;
      const scrR = 30;
      ctx.fillStyle = "#000";
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.fill();

      // Draw image inside screen
      ctx.save();
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.clip();
      drawImageFit(ctx, img, scrX, scrY, sw, sh, objectFit);
      ctx.restore();

      // Notch overlay
      ctx.fillStyle = device === "iphone-15-pro" ? "#1d1d1f" : "#2a2a2e";
      const notchX = destX + pad + (sw - notchW) / 2;
      roundRectPath(ctx, notchX, destY + pad, notchW, notchH, 8);
      ctx.fill();
      break;
    }

    case "pixel-8": {
      const pad = 12;
      const bodyW = sw + pad * 2;
      const bodyH = sh + pad * 2;
      const r = 36;

      ctx.fillStyle = "#1a1a1a";
      roundRectPath(ctx, destX, destY, bodyW, bodyH, r);
      ctx.fill();

      const scrX = destX + pad;
      const scrY = destY + pad;
      const scrR = 28;
      ctx.fillStyle = "#000";
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.fill();

      ctx.save();
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.clip();
      drawImageFit(ctx, img, scrX, scrY, sw, sh, objectFit);
      ctx.restore();

      // Camera
      const camW = sw * 0.28;
      const camX = destX + pad + (sw - camW) / 2;
      ctx.fillStyle = "#1a1a1a";
      roundRectPath(ctx, camX, destY + pad, camW, 12, 3);
      ctx.fill();
      break;
    }

    case "ipad-pro": {
      const pad = 16;
      const bodyW = sw + pad * 2;
      const bodyH = sh + pad * 2;
      const r = 20;

      ctx.fillStyle = "#1d1d1f";
      roundRectPath(ctx, destX, destY, bodyW, bodyH, r);
      ctx.fill();

      const scrX = destX + pad;
      const scrY = destY + pad;
      const scrR = 10;
      ctx.fillStyle = "#000";
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.fill();

      ctx.save();
      roundRectPath(ctx, scrX, scrY, sw, sh, scrR);
      ctx.clip();
      drawImageFit(ctx, img, scrX, scrY, sw, sh, objectFit);
      ctx.restore();
      break;
    }

    case "macbook-pro": {
      const pad = 16;
      const bodyW = sw + pad * 2;
      const bodyH = sh + pad * 2 + 10;
      const baseH = 16;

      ctx.fillStyle = "#1d1d1f";
      roundRectPath(ctx, destX, destY, bodyW, sh + 20, 12);
      ctx.fill();

      // Camera
      ctx.fillStyle = "#3a3a3c";
      ctx.beginPath();
      ctx.arc(destX + bodyW / 2, destY + 8, 4, 0, Math.PI * 2);
      ctx.fill();

      const scrX = destX + pad;
      const scrY = destY + 18;
      ctx.fillStyle = "#000";
      ctx.fillRect(scrX, scrY, sw, sh);

      ctx.save();
      ctx.beginPath();
      ctx.rect(scrX, scrY, sw, sh);
      ctx.clip();
      drawImageFit(ctx, img, scrX, scrY, sw, sh, objectFit);
      ctx.restore();

      // Base
      const baseX = destX + (bodyW - (bodyW + 40)) / 2;
      const baseY = destY + sh + 18;
      const baseW = bodyW + 40;
      const grad = ctx.createLinearGradient(baseX, baseY, baseX, baseY + baseH);
      grad.addColorStop(0, "#3a3a3c");
      grad.addColorStop(1, "#2a2a2e");
      ctx.fillStyle = grad;
      roundRectPath(ctx, baseX, baseY, baseW, baseH, 4);
      ctx.fill();
      break;
    }

    case "browser-chrome":
    case "browser-safari":
    case "browser-firefox": {
      const tabH = 36;

      const bgColor = device === "browser-safari" ? "#f5f5f7"
        : device === "browser-chrome" ? "#202124" : "#1c1b22";
      ctx.fillStyle = bgColor;
      roundRectPath(ctx, destX, destY, sw, tabH + 2, 12);
      ctx.fill();
      ctx.fillRect(destX, destY + tabH - 2, sw, 4);

      const dotColors = device === "browser-firefox"
        ? ["#ff6134", "#ffbd4f", "#28c840"]
        : ["#ff5f57", "#febc2e", "#28c840"];
      dotColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(destX + 16 + i * 16, destY + tabH / 2, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      const urlBg = device === "browser-safari" ? "#fff" : "#35363a";
      const urlText = device === "browser-safari" ? "#6e6e73" : "#9aa0a6";
      roundRectPath(ctx, destX + 60, destY + 10, sw - 76, 16, 4);
      ctx.fillStyle = urlBg;
      ctx.fill();
      ctx.fillStyle = urlText;
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("example.com", destX + 60 + (sw - 76) / 2, destY + 22);

      ctx.fillStyle = "#fff";
      ctx.fillRect(destX, destY + tabH, sw, sh);
      ctx.save();
      ctx.beginPath();
      ctx.rect(destX, destY + tabH, sw, sh);
      ctx.clip();
      drawImageFit(ctx, img, destX, destY + tabH, sw, sh, objectFit);
      ctx.restore();
      break;
    }

    default:
      ctx.drawImage(img, destX, destY, sw, sh);
  }
}

function drawImageFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, dx: number, dy: number, dw: number, dh: number, objectFit: string) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  if (objectFit === "fill") {
    ctx.drawImage(img, dx, dy, dw, dh);
  } else if (objectFit === "cover") {
    const scale = Math.max(dw / iw, dh / ih);
    const w = iw * scale;
    const h = ih * scale;
    ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  } else {
    // contain
    const scale = Math.min(dw / iw, dh / ih);
    const w = iw * scale;
    const h = ih * scale;
    ctx.fillStyle = "#000";
    ctx.fillRect(dx, dy, dw, dh);
    ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
  }
}

export async function exportToPNG(options: ExportOptions): Promise<void> {
  const { imageUrl, padding, borderRadius, exportScale, exportMode } = options;
  const img = await loadImage(imageUrl);

  const hasDevice = options.device !== "none";
  const hasBg = exportMode === "full";
  const isTransparent = exportMode === "transparent";

  // Screen dimensions (what the image is displayed at inside the device)
  const { sw, sh } = getNaturalScreenSize(options.device, img.naturalWidth, img.naturalHeight);

  // Frame overhead
  let framePadX = 0, framePadY = 0, frameExtraH = 0;
  if (hasDevice) {
    switch (options.device) {
      case "iphone-15":
      case "iphone-15-pro": framePadX = 12; framePadY = 12; frameExtraH = 16 + 18; break; // notch
      case "pixel-8": framePadX = 12; framePadY = 12; frameExtraH = 12; break;
      case "ipad-pro": framePadX = 16; framePadY = 16; frameExtraH = 0; break;
      case "macbook-pro": framePadX = 16; framePadY = 18; frameExtraH = 34; break;
      case "browser-chrome":
      case "browser-safari":
      case "browser-firefox": framePadX = 0; framePadY = 0; frameExtraH = 36; break;
    }
  }

  const frameW = sw + framePadX * 2;
  const frameH = sh + framePadY * 2 + frameExtraH;

  const contentW = hasDevice ? frameW : sw;
  const contentH = hasDevice ? frameH : sh;

  const padL = hasBg ? padding.left : 0;
  const padR = hasBg ? padding.right : 0;
  const padT = hasBg ? padding.top : 0;
  const padB = hasBg ? padding.bottom : 0;

  const totalW = contentW + padL + padR;
  const totalH = contentH + padT + padB;
  const scale = Math.min(exportScale || 1, 2);

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(totalW * scale);
  canvas.height = Math.round(totalH * scale);
  const ctx = canvas.getContext("2d")!;

  // Scale so all coords are in pixel units
  ctx.scale(scale, scale);

  // Shadow
  if (hasBg && options.shadow.enabled) {
    ctx.save();
    ctx.shadowOffsetX = options.shadow.x;
    ctx.shadowOffsetY = options.shadow.y;
    ctx.shadowBlur = options.shadow.blur;
    ctx.shadowColor = options.shadow.color;
    const sr = Math.min(borderRadius, 20);
    roundRectPath(ctx, padL, padT, contentW, contentH, sr);
    ctx.fillStyle = "rgba(0,0,0,0.01)";
    ctx.fill();
    ctx.restore();
  }

  // Background
  if (hasBg) {
    ctx.save();
    roundRectPath(ctx, 0, 0, totalW, totalH, Math.min(borderRadius, 20));
    ctx.clip();
    const gradient = createGradient(ctx, totalW, totalH, options.backgroundGradient);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, totalW, totalH);
    drawPattern(ctx, totalW, totalH, options.pattern);
    ctx.restore();
  }

  // Border radius clip for frame-only mode (no bg but has radius)
  if (isTransparent && borderRadius > 0) {
    ctx.save();
    roundRectPath(ctx, padL, padT, contentW, contentH, Math.min(borderRadius, 20));
    ctx.clip();
  }

  // Content
  if (hasDevice) {
    drawDeviceFrame(ctx, options.device, img, options.objectFit, padL, padT);
  } else {
    if (borderRadius > 0 && !isTransparent) {
      ctx.save();
      roundRectPath(ctx, padL, padT, sw, sh, Math.min(borderRadius, 16));
      ctx.clip();
      ctx.drawImage(img, padL, padT, sw, sh);
      ctx.restore();
    } else {
      ctx.drawImage(img, padL, padT, sw, sh);
    }
  }

  if (isTransparent && borderRadius > 0) {
    ctx.restore();
  }

  const link = document.createElement("a");
  const suffix = exportMode === "frame-only" ? "-frame" : exportMode === "transparent" ? "-transparent" : "";
  link.download = `frameshot${suffix}-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png", 0.92);
  link.click();
}
