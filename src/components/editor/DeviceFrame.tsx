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
          <div className="bg-black rounded-[3rem] p-3 border-2 border-gray-700 shadow-inner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10" />
            <div className="overflow-hidden rounded-[2.2rem] bg-white">{children}</div>
          </div>
        </div>
      );
    case "iphone-15-pro":
      return (
        <div className="relative">
          <div className="bg-[#1d1d1f] rounded-[3rem] p-3 border border-gray-600 shadow-inner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1d1d1f] rounded-b-xl z-10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-800 ring-1 ring-gray-600" />
            </div>
            <div className="overflow-hidden rounded-[2.2rem] bg-white">{children}</div>
          </div>
        </div>
      );
    case "pixel-8":
      return (
        <div className="relative">
          <div className="bg-[#1a1a1a] rounded-[2.5rem] p-2.5 border border-gray-700 shadow-inner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a1a] rounded-b-lg z-10" />
            <div className="overflow-hidden rounded-[2rem] bg-white">{children}</div>
          </div>
        </div>
      );
    case "ipad-pro":
      return (
        <div className="relative">
          <div className="bg-[#1d1d1f] rounded-[1.5rem] p-3 border border-gray-600 shadow-inner">
            <div className="overflow-hidden rounded-[0.8rem] bg-white">{children}</div>
          </div>
        </div>
      );
    case "macbook-pro":
      return (
        <div className="flex flex-col items-center">
          <div className="bg-[#1d1d1f] rounded-t-[1rem] p-3 border border-gray-600 border-b-0">
            <div className="flex items-center justify-center mb-1">
              <div className="w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-600" />
            </div>
            <div className="overflow-hidden rounded-[0.3rem] bg-white">{children}</div>
          </div>
          <div className="w-[110%] h-4 bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2e] rounded-b-lg flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-500 rounded-full" />
          </div>
        </div>
      );
    case "browser-chrome":
      return (
        <div className="flex flex-col w-full max-w-[900px]">
          <div className="bg-[#202124] rounded-t-xl px-4 py-2.5 flex items-center gap-2 border border-gray-700 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#35363a] rounded-md px-4 py-1 text-xs text-gray-400 max-w-xs w-full text-center">example.com</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-700 border-t-0 bg-white">{children}</div>
        </div>
      );
    case "browser-safari":
      return (
        <div className="flex flex-col w-full max-w-[900px]">
          <div className="bg-[#f5f5f7] rounded-t-xl px-4 py-2 flex items-center gap-2 border border-gray-300 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-500 max-w-xs w-full text-center border border-gray-200">example.com</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-300 border-t-0 bg-white">{children}</div>
        </div>
      );
    case "browser-firefox":
      return (
        <div className="flex flex-col w-full max-w-[900px]">
          <div className="bg-[#1c1b22] rounded-t-xl px-4 py-2.5 flex items-center gap-2 border border-gray-600 border-b-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff6134]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd4f]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#2b2a33] rounded-lg px-4 py-1 text-xs text-gray-400 max-w-xs w-full text-center">example.com</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-b-xl border border-gray-600 border-t-0 bg-white">{children}</div>
        </div>
      );
    default:
      return <>{children}</>;
  }
}

