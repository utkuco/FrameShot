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
    case "to-right":
      gradient = ctx.createLinearGradient(0, 0, w, 0);
      break;
    case "to-bottom":
      gradient = ctx.createLinearGradient(0, 0, 0, h);
      break;
    case "to-br":
      gradient = ctx.createLinearGradient(0, 0, w, h);
      break;
    case "to-bl":
      gradient = ctx.createLinearGradient(w, 0, 0, h);
      break;
    case "radial":
      gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
      break;
    default:
      gradient = ctx.createLinearGradient(0, 0, w, h);
  }
  config.colors.forEach((color, i) => {
    gradient.addColorStop(i / Math.max(config.colors.length - 1, 1), color);
  });
  return gradient;
}

function drawPattern(ctx: CanvasRenderingContext2D, w: number, h: number, pattern: PatternConfig) {
  if (pattern.type === "none") return;
  const opacity = pattern.opacity;
  const r = parseInt(pattern.color.slice(1, 3), 16);
  const g = parseInt(pattern.color.slice(3, 5), 16);
  const b = parseInt(pattern.color.slice(5, 7), 16);
  const rgba = `rgba(${r},${g},${b},${opacity})`;
  const s = pattern.scale * 20;

  ctx.save();
  ctx.strokeStyle = rgba;
  ctx.fillStyle = rgba;

  switch (pattern.type) {
    case "dots":
      for (let x = 0; x < w; x += s) {
        for (let y = 0; y < h; y += s) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    case "grid":
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += s) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += s) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      break;
    case "diagonal":
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += s) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke();
      }
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

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Device frame dimensions for canvas export
interface DeviceDimensions {
  frameW: number;
  frameH: number;
  screenX: number;
  screenY: number;
  screenW: number;
  screenH: number;
  outerRadius: number;
  innerRadius: number;
  hasNotch?: boolean;
  notchW?: number;
  notchH?: number;
  hasBase?: boolean;
  baseW?: number;
  baseH?: number;
  tabBar?: boolean;
}

function getDeviceDimensions(device: DeviceType, imgW: number, imgH: number): DeviceDimensions | null {
  const s = Math.min(1, 400 / Math.max(imgW, imgH));

  switch (device) {
    case "iphone-15":
    case "iphone-15-pro": {
      const screenW = imgW * s;
      const screenH = imgH * s;
      const pad = 12 * s;
      return {
        frameW: screenW + pad * 2,
        frameH: screenH + pad * 2 + 16,
        screenX: pad,
        screenY: pad + 8,
        screenW,
        screenH,
        outerRadius: 40,
        innerRadius: 32,
        hasNotch: true,
        notchW: screenW * 0.4,
        notchH: 20,
        hasBase: false,
      };
    }
    case "pixel-8": {
      const screenW = imgW * s;
      const screenH = imgH * s;
      const pad = 12 * s;
      return {
        frameW: screenW + pad * 2,
        frameH: screenH + pad * 2,
        screenX: pad,
        screenY: pad,
        screenW,
        screenH,
        outerRadius: 36,
        innerRadius: 28,
        hasNotch: true,
        notchW: screenW * 0.3,
        notchH: 16,
        hasBase: false,
      };
    }
    case "ipad-pro": {
      const screenW = imgW * s;
      const screenH = imgH * s;
      const pad = 16 * s;
      return {
        frameW: screenW + pad * 2,
        frameH: screenH + pad * 2,
        screenX: pad,
        screenY: pad,
        screenW,
        screenH,
        outerRadius: 20,
        innerRadius: 10,
        hasBase: false,
      };
    }
    case "macbook-pro": {
      const screenW = imgW * s;
      const screenH = imgH * s;
      const pad = 16 * s;
      return {
        frameW: screenW + pad * 2,
        frameH: screenH + pad * 2 + 10,
        screenX: pad,
        screenY: pad + 10,
        screenW,
        screenH,
        outerRadius: 12,
        innerRadius: 4,
        hasBase: true,
        baseW: screenW + pad * 2 + 30,
        baseH: 14,
        hasNotch: true,
        notchW: 6,
        notchH: 6,
      };
    }
    case "browser-chrome":
    case "browser-safari":
    case "browser-firefox": {
      const screenW = imgW * s;
      const screenH = imgH * s;
      const tabH = 32;
      return {
        frameW: screenW,
        frameH: screenH + tabH,
        screenX: 0,
        screenY: tabH,
        screenW,
        screenH,
        outerRadius: 12,
        innerRadius: 0,
        tabBar: true,
      };
    }
    default:
      return null;
  }
}

function drawDeviceFrame(
  ctx: CanvasRenderingContext2D,
  dim: DeviceDimensions,
  device: DeviceType,
  img: HTMLImageElement,
  objectFit: string,
) {
  // Draw device body
  if (dim.tabBar) {
    // Browser tab bar
    const isDark = device === "browser-chrome" || device === "browser-firefox";
    const bgColor = device === "browser-safari" ? "#f5f5f7" : device === "browser-chrome" ? "#202124" : "#1c1b22";
    const dotColor1 = device === "browser-firefox" ? "#ff6134" : "#ff5f57";

    ctx.save();
    roundRect(ctx, 0, 0, dim.frameW, dim.frameH, dim.outerRadius);
    ctx.clip();

    // Tab bar background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, dim.frameW, dim.screenY);

    // Traffic lights
    const dotR = 5;
    const dotY = dim.screenY / 2;
    ctx.fillStyle = dotColor1;
    ctx.beginPath(); ctx.arc(16, dotY, dotR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#febc2e";
    ctx.beginPath(); ctx.arc(32, dotY, dotR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#28c840";
    ctx.beginPath(); ctx.arc(48, dotY, dotR, 0, Math.PI * 2); ctx.fill();

    // URL bar
    const urlBg = isDark ? (device === "browser-chrome" ? "#35363a" : "#2b2a33") : "#ffffff";
    ctx.fillStyle = urlBg;
    roundRect(ctx, 70, dotY - 8, dim.frameW - 90, 16, 4);
    ctx.fill();
    ctx.fillStyle = isDark ? "#9aa0a6" : "#6e6e73";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("example.com", 70 + (dim.frameW - 90) / 2, dotY + 3);

    ctx.restore();
  } else {
    // Phone/tablet/laptop body
    ctx.save();
    roundRect(ctx, 0, 0, dim.frameW, dim.frameH, dim.outerRadius);
    ctx.clip();

    const bodyColor = device === "iphone-15-pro" || device === "ipad-pro" || device === "macbook-pro" ? "#1d1d1f" : "#1a1a1a";
    ctx.fillStyle = bodyColor;
    ctx.fillRect(0, 0, dim.frameW, dim.frameH);

    // Notch
    if (dim.hasNotch && dim.notchW && dim.notchH) {
      const notchX = (dim.frameW - dim.notchW) / 2;
      ctx.fillStyle = bodyColor;
      roundRect(ctx, notchX, 0, dim.notchW, dim.notchH, 8);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw screen content
  ctx.save();
  if (dim.innerRadius > 0) {
    roundRect(ctx, dim.screenX, dim.screenY, dim.screenW, dim.screenH, dim.innerRadius);
    ctx.clip();
  } else {
    ctx.beginPath();
    ctx.rect(dim.screenX, dim.screenY, dim.screenW, dim.screenH);
    ctx.clip();
  }

  if (objectFit === "cover") {
    const scale = Math.max(dim.screenW / img.naturalWidth, dim.screenH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const drawX = dim.screenX + (dim.screenW - drawW) / 2;
    const drawY = dim.screenY + (dim.screenH - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  } else if (objectFit === "fill") {
    ctx.drawImage(img, dim.screenX, dim.screenY, dim.screenW, dim.screenH);
  } else {
    // contain
    const scale = Math.min(dim.screenW / img.naturalWidth, dim.screenH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const drawX = dim.screenX + (dim.screenW - drawW) / 2;
    const drawY = dim.screenY + (dim.screenH - drawH) / 2;
    ctx.fillStyle = "#000";
    ctx.fillRect(dim.screenX, dim.screenY, dim.screenW, dim.screenH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }
  ctx.restore();

  // Laptop base
  if (dim.hasBase && dim.baseW && dim.baseH) {
    const baseX = (dim.frameW - dim.baseW) / 2;
    const baseY = dim.frameH;
    const grad = ctx.createLinearGradient(baseX, baseY, baseX, baseY + dim.baseH);
    grad.addColorStop(0, "#3a3a3c");
    grad.addColorStop(1, "#2a2a2e");
    ctx.fillStyle = grad;
    roundRect(ctx, baseX, baseY, dim.baseW, dim.baseH, 4);
    ctx.fill();
  }
}

export async function exportToCanvas(options: ExportOptions): Promise<HTMLCanvasElement> {
  const {
    imageUrl,
    padding,
    borderRadius,
    exportScale,
    exportMode,
  } = options;

  const img = await loadImage(imageUrl);
  const scale = Math.min(exportScale, 2); // cap at 2x

  // Calculate content dimensions
  const deviceDim = getDeviceDimensions(options.device, img.naturalWidth, img.naturalHeight);

  let contentW: number, contentH: number;

  if (deviceDim) {
    // With device frame
    const totalH = deviceDim.frameH + (deviceDim.hasBase && deviceDim.baseH ? deviceDim.baseH : 0);
    contentW = deviceDim.frameW;
    contentH = totalH;
  } else {
    // No device — just the image
    contentW = img.naturalWidth;
    contentH = img.naturalHeight;
  }

  // For transparent/frame-only, no padding or background
  const padL = exportMode === "full" ? padding.left : 0;
  const padR = exportMode === "full" ? padding.right : 0;
  const padT = exportMode === "full" ? padding.top : 0;
  const padB = exportMode === "full" ? padding.bottom : 0;

  const canvasW = contentW + padL + padR;
  const canvasH = contentH + padT + padB;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(canvasW * scale);
  canvas.height = Math.round(canvasH * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Background (only for "full" mode)
  if (exportMode === "full") {
    ctx.save();
    roundRect(ctx, 0, 0, canvasW, canvasH, borderRadius);
    ctx.clip();

    const gradient = createGradient(ctx, canvasW, canvasH, options.backgroundGradient);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);

    drawPattern(ctx, canvasW, canvasH, options.pattern);
    ctx.restore();

    // Shadow — add extra canvas space
    if (options.shadow.enabled) {
      const shadowPad = Math.abs(options.shadow.x) + options.shadow.blur * 2 + Math.abs(options.shadow.y);
      const sCanvas = document.createElement("canvas");
      sCanvas.width = canvasW * scale + shadowPad * scale * 2;
      sCanvas.height = canvasH * scale + shadowPad * scale * 2;
      const sCtx = sCanvas.getContext("2d")!;
      sCtx.scale(scale, scale);

      sCtx.shadowOffsetX = options.shadow.x;
      sCtx.shadowOffsetY = options.shadow.y;
      sCtx.shadowBlur = options.shadow.blur;
      sCtx.shadowColor = options.shadow.color;

      sCtx.save();
      roundRect(sCtx, shadowPad, shadowPad, canvasW, canvasH, borderRadius);
      sCtx.clip();
      const g2 = createGradient(sCtx, canvasW, canvasH, options.backgroundGradient);
      sCtx.fillStyle = g2;
      sCtx.fillRect(shadowPad, shadowPad, canvasW, canvasH);
      drawPattern(sCtx, canvasW + shadowPad, canvasH + shadowPad, options.pattern);
      sCtx.restore();

      // Draw content on shadow canvas
      if (deviceDim) {
        sCtx.save();
        drawDeviceFrame(sCtx, deviceDim, options.device, img, options.objectFit);
        sCtx.restore();
      } else {
        sCtx.drawImage(img, shadowPad + padL, shadowPad + padT, contentW, contentH);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(sCanvas, -shadowPad * scale, -shadowPad * scale);
      return canvas;
    }
  }

  // Draw content
  if (deviceDim) {
    // Draw with device frame
    ctx.save();
    ctx.translate(padL, padT);
    drawDeviceFrame(ctx, deviceDim, options.device, img, options.objectFit);
    ctx.restore();
  } else {
    // Draw just the image
    if (borderRadius > 0 && exportMode !== "transparent") {
      ctx.save();
      roundRect(ctx, padL, padT, contentW, contentH, Math.min(borderRadius, 20));
      ctx.clip();
      ctx.drawImage(img, padL, padT, contentW, contentH);
      ctx.restore();
    } else {
      ctx.drawImage(img, padL, padT, contentW, contentH);
    }
  }

  return canvas;
}

export async function exportToPNG(options: ExportOptions): Promise<void> {
  const canvas = await exportToCanvas(options);
  const link = document.createElement("a");
  const suffix = options.exportMode === "frame-only" ? "-frame" : options.exportMode === "transparent" ? "-transparent" : "";
  link.download = `frameshot${suffix}-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png", 0.9);
  link.click();
}
