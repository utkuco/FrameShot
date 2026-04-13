import { GradientConfig, PatternConfig, ShadowConfig, PaddingConfig, Transform3DConfig, DeviceType } from "@/types";

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
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += s) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      break;
    case "diagonal":
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += s) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
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

export async function exportToCanvas(options: ExportOptions): Promise<HTMLCanvasElement> {
  const {
    imageUrl,
    imageWidth,
    imageHeight,
    backgroundGradient,
    pattern,
    shadow,
    padding,
    borderRadius,
    exportScale,
  } = options;

  const img = await loadImage(imageUrl);
  const imgW = img.naturalWidth || imageWidth;
  const imgH = img.naturalHeight || imageHeight;

  const canvasW = imgW + padding.left + padding.right;
  const canvasH = imgH + padding.top + padding.bottom;

  const scale = exportScale;
  const canvas = document.createElement("canvas");
  canvas.width = canvasW * scale;
  canvas.height = canvasH * scale;
  const ctx = canvas.getContext("2d")!;

  ctx.scale(scale, scale);

  // Draw rounded rect background with gradient
  ctx.save();
  roundRect(ctx, 0, 0, canvasW, canvasH, borderRadius);
  ctx.clip();

  // Background gradient
  const gradient = createGradient(ctx, canvasW, canvasH, backgroundGradient);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Pattern
  drawPattern(ctx, canvasW, canvasH, pattern);
  ctx.restore();

  // Shadow (drawn on a separate pass since shadow affects the whole rect)
  if (shadow.enabled) {
    // Redraw with shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = canvasW * scale + (Math.abs(shadow.x) + shadow.blur * 2) * scale;
    shadowCanvas.height = canvasH * scale + (Math.abs(shadow.y) + shadow.blur * 2) * scale;
    const sCtx = shadowCanvas.getContext("2d")!;
    sCtx.scale(scale, scale);

    const offsetX = shadow.x < 0 ? -shadow.x + shadow.blur : shadow.blur;
    const offsetY = shadow.y < 0 ? -shadow.y + shadow.blur : shadow.blur;

    sCtx.shadowOffsetX = shadow.x;
    sCtx.shadowOffsetY = shadow.y;
    sCtx.shadowBlur = shadow.blur;
    sCtx.shadowColor = shadow.color;

    sCtx.save();
    roundRect(sCtx, offsetX, offsetY, canvasW, canvasH, borderRadius);
    sCtx.clip();

    const g2 = createGradient(sCtx, canvasW, canvasH, backgroundGradient);
    sCtx.fillStyle = g2;
    sCtx.fillRect(offsetX, offsetY, canvasW, canvasH);
    drawPattern(sCtx, canvasW + offsetX, canvasH + offsetY, pattern);
    sCtx.restore();

    // Draw image on shadow canvas
    sCtx.save();
    roundRect(sCtx, offsetX, offsetY, canvasW, canvasH, borderRadius);
    sCtx.clip();
    sCtx.drawImage(img, offsetX + padding.left, offsetY + padding.top, imgW, imgH);
    sCtx.restore();

    // Now composite: clear original and draw shadow canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(
      shadowCanvas,
      -(offsetX * scale) + (shadow.x < 0 ? 0 : 0),
      -(offsetY * scale) + (shadow.y < 0 ? 0 : 0)
    );

    return canvas;
  }

  // Draw image
  ctx.save();
  roundRect(ctx, 0, 0, canvasW, canvasH, borderRadius);
  ctx.clip();
  ctx.drawImage(img, padding.left, padding.top, imgW, imgH);
  ctx.restore();

  return canvas;
}

export async function exportToPNG(options: ExportOptions): Promise<void> {
  const canvas = await exportToCanvas(options);
  const link = document.createElement("a");
  link.download = `screenshot-beautified-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
