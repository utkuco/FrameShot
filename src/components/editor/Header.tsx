"use client";

import { useEditorStore } from "@/lib/store";
import { Download, RotateCcw, Frame, ArrowLeft, Menu, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { exportToPNG } from "@/lib/export-utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  const reset = useEditorStore((s) => s.reset);
  const clearImage = useEditorStore((s) => s.clearImage);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("frameshot-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("frameshot-theme", next ? "dark" : "light");
  }, [isDark]);

  const handleExport = useCallback(async () => {
    const state = useEditorStore.getState();
    if (!state.imageUrl) return;

    try {
      await exportToPNG({
        imageUrl: state.imageUrl,
        imageWidth: state.imageWidth,
        imageHeight: state.imageHeight,
        backgroundGradient: state.backgroundGradient,
        pattern: state.pattern,
        shadow: state.shadow,
        padding: state.padding,
        borderRadius: state.borderRadius,
        transform3d: state.transform3d,
        device: state.device,
        exportScale: state.exportScale,
      });
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <header className="h-12 border-b border-border bg-sidebar-background flex items-center justify-between px-3 md:px-4 flex-shrink-0 z-40">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={onToggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Back to Home</TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Frame className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent hidden sm:inline">
              FrameShot
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isDark ? "Light Mode" : "Dark Mode"}
            </TooltipContent>
          </Tooltip>

          {imageUrl && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearImage()}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">New</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload New Image</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" onClick={handleExport}>
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export as PNG</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={reset}
                    className="text-destructive hover:text-destructive"
                  >
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset All Settings</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
}
