import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function gradientToCSS(colors: string[], direction: string): string {
  const colorStops = colors.join(", ");
  switch (direction) {
    case "to-right":
      return `linear-gradient(to right, ${colorStops})`;
    case "to-bottom":
      return `linear-gradient(to bottom, ${colorStops})`;
    case "to-br":
      return `linear-gradient(to bottom right, ${colorStops})`;
    case "to-bl":
      return `linear-gradient(to bottom left, ${colorStops})`;
    case "radial":
      return `radial-gradient(circle, ${colorStops})`;
    case "conic":
      return `conic-gradient(from 0deg, ${colorStops})`;
    default:
      return `linear-gradient(to right, ${colorStops})`;
  }
}

export function patternToCSS(type: string, color: string, scale: number, opacity: number): string {
  switch (type) {
    case "dots":
      return `radial-gradient(circle, ${color} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
    case "diagonal":
      return `repeating-linear-gradient(45deg, transparent, transparent ${scale * 10}px, ${color} ${scale * 10}px, ${color} ${scale * 10 + 1}px)`;
    case "circles":
      return `radial-gradient(circle at center, transparent ${scale * 30}px, ${color} ${scale * 30}px, ${color} ${scale * 31}px, transparent ${scale * 31}px)`;
    case "waves":
      return `repeating-linear-gradient(135deg, transparent, transparent ${scale * 10}px, ${color}22 ${scale * 10}px, ${color}22 ${scale * 12}px)`;
    default:
      return "none";
  }
}
