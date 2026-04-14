"use client";

import Image from "next/image";

export function MockupCard({ gradient, title, desc, device, dark, imgSrc }: {
  gradient: string;
  title: string;
  desc: string;
  device: "phone" | "laptop" | "browser" | "tablet" | "none";
  dark?: boolean;
  imgSrc: string;
}) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-[#e4e4e7] hover:shadow-xl hover:shadow-[#6366f1]/10 hover:border-[#6366f1]/30 transition-all">
      {/* Preview */}
      <div
        className="aspect-[4/3] flex items-center justify-center p-6 relative"
        style={{ background: gradient }}
      >
        <div className="relative">
          {device === "phone" && (
            <div className="w-20 h-[150px] sm:w-24 sm:h-[180px] rounded-[24px] border-2 border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="h-[18px] bg-black/20 flex items-center justify-center">
                <div className="w-10 h-3 rounded-full bg-black/30" />
              </div>
              <div className="flex-1 p-1.5">
                <div className="w-full h-full rounded-[10px] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    width={96}
                    height={140}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="h-4 flex items-center justify-center">
                <div className="w-8 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>
          )}
          {device === "browser" && (
            <div className="relative w-full max-w-[260px]">
              <div className="rounded-t-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="h-7 bg-black/20 flex items-center px-3 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="flex-1 h-4 rounded-md bg-black/20 mx-2" />
                </div>
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    width={260}
                    height={163}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="h-3 bg-white/20 rounded-b-lg mx-4" />
            </div>
          )}
          {device === "tablet" && (
            <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="flex-1 p-2">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    width={128}
                    height={160}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="h-3 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-white/30" />
              </div>
            </div>
          )}
          {device === "none" && (
            <div
              className="max-w-[220px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: dark ? "0 25px 50px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.15)" }}
            >
              <Image
                src={imgSrc}
                alt={title}
                width={220}
                height={157}
                className="w-full block"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white">
        <h3 className="text-sm font-bold text-[#18181b] mb-0.5">{title}</h3>
        <p className="text-xs text-[#a1a1aa]">{desc}</p>
      </div>
    </div>
  );
}
