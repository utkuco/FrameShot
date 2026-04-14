"use client";

import { useEditorStore } from "@/lib/store";
import { UploadZone } from "./UploadZone";
import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) setSidebarOpen(false);
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-screen flex flex-col bg-background">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar overlay on mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-10 md:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`border-r border-sidebar-border bg-sidebar-background overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out z-20 ${
              sidebarOpen ? "w-72" : "w-0"
            } fixed md:relative h-[calc(100vh-48px)] md:h-auto`}
          >
            <div
              className={`w-72 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              } transition-opacity duration-200`}
            >
              <Sidebar />
            </div>
          </aside>

          {/* Sidebar toggle (desktop) */}
          {!sidebarOpen && (
            <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none rounded-r-lg shadow-sm"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show Sidebar</TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Main canvas */}
          <main className="flex-1 flex items-center justify-center checkerboard overflow-auto">
            <CanvasOrUpload />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

function CanvasOrUpload() {
  const imageUrl = useEditorStore((s) => s.imageUrl);
  return imageUrl ? <Canvas /> : <UploadZone />;
}
