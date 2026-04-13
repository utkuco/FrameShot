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
        <div className="relative">
          <div className="bg-black rounded-[3rem] p-3 border-2 border-gray-700 shadow-inner" style={{ width: 320 }}>
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="overflow-hidden rounded-[2.2rem] bg-white relative" style={{ height: 620 }}>
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center mt-2">
              <div className="w-28 h-1 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
      );
    case "iphone-15-pro":
      return (
        <div className="relative">
          <div className="bg-[#1d1d1f] rounded-[3rem] p-3 border border-gray-600 shadow-inner" style={{ width: 320 }}>
            {/* Dynamic Island with camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1d1d1f] rounded-b-xl z-10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-800 ring-1 ring-gray-600" />
            </div>
            {/* Screen */}
            <div className="overflow-hidden rounded-[2.2rem] bg-white relative" style={{ height: 620 }}>
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center mt-2">
              <div className="w-28 h-1 bg-gray-500 rounded-full" />
            </div>
          </div>
        </div>
      );
    case "pixel-8":
      return (
        <div className="relative">
          <div className="bg-[#1a1a1a] rounded-[2.5rem] p-2.5 border border-gray-700 shadow-inner" style={{ width: 310 }}>
            {/* Camera cutout */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a1a] rounded-b-lg z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700" />
            </div>
            {/* Screen */}
            <div className="overflow-hidden rounded-[2rem] bg-white relative" style={{ height: 610 }}>
              {children}
            </div>
          </div>
        </div>
      );
    case "ipad-pro":
      return (
        <div className="relative">
          <div className="bg-[#1d1d1f] rounded-[1.5rem] p-3 border border-gray-600 shadow-inner" style={{ width: 520 }}>
            <div className="overflow-hidden rounded-[0.8rem] bg-white relative" style={{ height: 680 }}>
              {children}
            </div>
          </div>
        </div>
      );
    case "macbook-pro":
      return (
        <div className="flex flex-col items-center">
          {/* Screen housing */}
          <div className="bg-[#1d1d1f] rounded-t-[1rem] p-3 border border-gray-600 border-b-0" style={{ width: 640 }}>
            <div className="flex items-center justify-center mb-1">
              <div className="w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-600" />
            </div>
            <div className="overflow-hidden rounded-[0.3rem] bg-white relative" style={{ height: 400 }}>
              {children}
            </div>
          </div>
          {/* Base */}
          <div className="bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2e] rounded-b-lg flex items-center justify-center" style={{ width: 700, height: 16 }}>
            <div className="w-16 h-1 bg-gray-500 rounded-full" />
          </div>
        </div>
      );
    case "browser-chrome":
      return (
        <div className="flex flex-col" style={{ width: 900 }}>
          <div className="bg-[#202124] rounded-t-xl px-4 py-2.5 flex items-center gap-3 border border-gray-700 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#35363a] rounded-md px-4 py-1 text-xs text-gray-400 max-w-xs w-full text-center">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-700 border-t-0 bg-white relative" style={{ height: 500 }}>
            {children}
          </div>
        </div>
      );
    case "browser-safari":
      return (
        <div className="flex flex-col" style={{ width: 900 }}>
          <div className="bg-[#f5f5f7] rounded-t-xl px-4 py-2 flex items-center gap-3 border border-gray-300 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-500 max-w-xs w-full text-center border border-gray-200">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-300 border-t-0 bg-white relative" style={{ height: 500 }}>
            {children}
          </div>
        </div>
      );
    case "browser-firefox":
      return (
        <div className="flex flex-col" style={{ width: 900 }}>
          <div className="bg-[#1c1b22] rounded-t-xl px-4 py-2.5 flex items-center gap-3 border border-gray-600 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff6134]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd4f]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#2b2a33] rounded-lg px-4 py-1 text-xs text-gray-400 max-w-xs w-full text-center">
                example.com
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-600 border-t-0 bg-white relative" style={{ height: 500 }}>
            {children}
          </div>
        </div>
      );
    default:
      return <>{children}</>;
  }
}
