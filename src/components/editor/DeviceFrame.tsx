"use client";

import { DeviceType } from "@/types";

interface DeviceFrameProps {
  device: DeviceType;
  children: React.ReactNode;
}

export function DeviceFrame({ device, children }: DeviceFrameProps) {
  switch (device) {
    case "iphone-15":
      return (
        <div className="relative inline-block">
          <div className="bg-black rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-2.5 border-2 border-gray-700 shadow-inner mx-auto"
            style={{ width: "clamp(200px, 50vmin, 300px)" }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-black rounded-b-xl sm:rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-black relative" style={{ aspectRatio: "9 / 19.5" }}>
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center mt-1 sm:mt-1.5">
              <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
      );

    case "iphone-15-pro":
      return (
        <div className="relative inline-block">
          <div className="bg-[#1d1d1f] rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-2.5 border border-gray-600 shadow-inner mx-auto"
            style={{ width: "clamp(200px, 50vmin, 300px)" }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-[#1d1d1f] rounded-b-xl z-10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-800 ring-1 ring-gray-600" />
            </div>
            {/* Screen */}
            <div className="overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-black relative" style={{ aspectRatio: "9 / 19.5" }}>
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center mt-1 sm:mt-1.5">
              <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gray-500 rounded-full" />
            </div>
          </div>
        </div>
      );

    case "pixel-8":
      return (
        <div className="relative inline-block">
          <div className="bg-[#1a1a1a] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 border border-gray-700 shadow-inner mx-auto"
            style={{ width: "clamp(195px, 48vmin, 290px)" }}
          >
            {/* Camera cutout */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-[#1a1a1a] rounded-b-lg z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700" />
            </div>
            {/* Screen */}
            <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-black relative" style={{ aspectRatio: "9 / 19.5" }}>
              {children}
            </div>
          </div>
        </div>
      );

    case "ipad-pro":
      return (
        <div className="relative inline-block">
          <div className="bg-[#1d1d1f] rounded-[1.2rem] sm:rounded-[1.5rem] p-2 sm:p-3 border border-gray-600 shadow-inner mx-auto"
            style={{ width: "clamp(300px, 60vmin, 480px)" }}
          >
            <div className="overflow-hidden rounded-[0.6rem] sm:rounded-[0.8rem] bg-black relative" style={{ aspectRatio: "3 / 4" }}>
              {children}
            </div>
          </div>
        </div>
      );

    case "macbook-pro":
      return (
        <div className="flex flex-col items-center inline-block">
          {/* Screen housing */}
          <div className="bg-[#1d1d1f] rounded-t-[0.8rem] sm:rounded-t-[1rem] p-2 sm:p-3 border border-gray-600 border-b-0 mx-auto"
            style={{ width: "clamp(340px, 65vmin, 580px)" }}
          >
            <div className="flex items-center justify-center mb-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-700 ring-1 ring-gray-600" />
            </div>
            <div className="overflow-hidden rounded-[0.2rem] sm:rounded-[0.3rem] bg-black relative" style={{ aspectRatio: "16 / 10" }}>
              {children}
            </div>
          </div>
          {/* Base */}
          <div className="bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2e] rounded-b-lg flex items-center justify-center"
            style={{ width: "clamp(370px, 70vmin, 630px)", height: 12 }}
          >
            <div className="w-14 h-0.5 bg-gray-500 rounded-full" />
          </div>
        </div>
      );

    case "browser-chrome":
      return (
        <div className="flex flex-col inline-block mx-auto" style={{ width: "clamp(340px, 70vmin, 800px)" }}>
          <div className="bg-[#202124] rounded-t-xl px-3 sm:px-4 py-1.5 sm:py-2.5 flex items-center gap-2 sm:gap-3 border border-gray-700 border-b-0">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#35363a] rounded-md px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400 max-w-xs w-full text-center">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-700 border-t-0 bg-white relative" style={{ aspectRatio: "16 / 10" }}>
            {children}
          </div>
        </div>
      );

    case "browser-safari":
      return (
        <div className="flex flex-col inline-block mx-auto" style={{ width: "clamp(340px, 70vmin, 800px)" }}>
          <div className="bg-[#f5f5f7] rounded-t-xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3 border border-gray-300 border-b-0">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-lg px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-500 max-w-xs w-full text-center border border-gray-200">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-300 border-t-0 bg-white relative" style={{ aspectRatio: "16 / 10" }}>
            {children}
          </div>
        </div>
      );

    case "browser-firefox":
      return (
        <div className="flex flex-col inline-block mx-auto" style={{ width: "clamp(340px, 70vmin, 800px)" }}>
          <div className="bg-[#1c1b22] rounded-t-xl px-3 sm:px-4 py-1.5 sm:py-2.5 flex items-center gap-2 sm:gap-3 border border-gray-600 border-b-0">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff6134]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd4f]" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#2b2a33] rounded-lg px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400 max-w-xs w-full text-center">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-600 border-t-0 bg-white relative" style={{ aspectRatio: "16 / 10" }}>
            {children}
          </div>
        </div>
      );

    default:
      return <>{children}</>;
  }
}
