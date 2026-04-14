import Link from "next/link";
import type { Metadata } from "next";
import { MockupCard } from "@/components/editor/MockupCard";

export const metadata: Metadata = {
  title: "FrameShot — Free Screenshot Beautifier & Mockup Generator",
  description:
    "Transform raw screenshots into stunning visuals for social media, presentations, and blogs. Add device mockups, gradients, shadows, and 3D effects. Free — no signup.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#18181b]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e4e4e7] bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
              FrameShot
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#71717a]">
            <a href="#examples" className="hover:text-[#18181b] transition-colors">Examples</a>
            <a href="#features" className="hover:text-[#18181b] transition-colors">Features</a>
            <a href="#faq" className="hover:text-[#18181b] transition-colors">FAQ</a>
          </nav>
          <Link
            href="/editor"
            className="px-4 sm:px-5 py-2 rounded-lg bg-[#6366f1] hover:bg-[#818cf8] text-white font-medium text-sm transition-colors"
          >
            Open Editor
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e4e4e7] bg-[#f4f4f5] text-[10px] sm:text-xs font-medium text-[#71717a] mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Free · No Signup · Browser-Based
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Beautify Your Screenshots
            <br />
            <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-[#71717a] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Add device mockups, gradient backgrounds, shadows, and 3D effects to your screenshots. Perfect for social media, presentations, and blogs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-colors text-sm sm:text-base shadow-lg shadow-[#6366f1]/25"
            >
              Start Beautifying →
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="examples">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Made with FrameShot</h2>
            <p className="text-sm sm:text-base text-[#71717a]">Real results from real screenshots</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MockupCard
              gradient="linear-gradient(135deg, #667eea, #764ba2)"
              title="Mobile App"
              desc="iPhone frame · Purple gradient"
              device="phone"
              imgSrc="/examples/app-mockup.png"
            />
            <MockupCard
              gradient="linear-gradient(135deg, #4facfe, #00f2fe)"
              title="Web App"
              desc="Browser frame · Blue gradient"
              device="browser"
              imgSrc="/examples/web-mockup.jpg"
            />
            <MockupCard
              gradient="linear-gradient(135deg, #1a1a2e, #16213e)"
              title="Shadow Effect"
              desc="No device · Dark gradient · Drop shadow"
              device="none"
              dark
              imgSrc="/examples/web-mockup.jpg"
            />
            <MockupCard
              gradient="linear-gradient(135deg, #fa709a, #fee140)"
              title="Tablet"
              desc="iPad frame · Coral gradient"
              device="tablet"
              imgSrc="/examples/mobile-mockup.jpg"
            />
            <MockupCard
              gradient="linear-gradient(135deg, #a18cd1, #fbc2eb)"
              title="Gradient Background"
              desc="No device · Pastel gradient"
              device="none"
              imgSrc="/examples/app-mockup.png"
            />
            <MockupCard
              gradient="linear-gradient(135deg, #43e97b, #38f9d7)"
              title="3D Transform"
              desc="No device · Green gradient · 3D rotation"
              device="none"
              imgSrc="/examples/mobile-mockup.jpg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">How It Works</h2>
            <p className="text-sm sm:text-base text-[#71717a]">Three simple steps to transform any screenshot.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Upload", desc: "Drag & drop, click, or paste from clipboard. PNG, JPG, WebP supported.", icon: "📸" },
              { step: "02", title: "Customize", desc: "Pick gradients, device frames, shadows, padding, and 3D transforms. Crop to refine.", icon: "🎨" },
              { step: "03", title: "Export", desc: "Download as high-res 2x PNG. Ready for social media, docs, or presentations.", icon: "✨" },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 sm:p-6 rounded-2xl border border-[#e4e4e7] bg-white hover:border-[#6366f1]/30 hover:shadow-lg hover:shadow-[#6366f1]/5 transition-all text-center"
              >
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{item.icon}</span>
                <div className="text-[10px] sm:text-xs font-mono text-[#6366f1] mb-1.5 sm:mb-2">{item.step}</div>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#fafafa]" id="features">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Features</h2>
            <p className="text-sm sm:text-base text-[#71717a]">Everything you need, nothing you don&apos;t.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Device Mockups", desc: "iPhone 15, Pixel 8, iPad, MacBook, Chrome, Safari, Firefox frames.", tag: "Mockups" },
              { title: "Gradients", desc: "12 presets + custom colors. Linear, radial, diagonal directions.", tag: "Backgrounds" },
              { title: "Image Crop", desc: "Crop before beautifying. Free aspect or fixed ratios like 1:1, 16:9.", tag: "Editing" },
              { title: "Fit & Position", desc: "Contain, cover, or fill — control how the image fits in the frame.", tag: "Editing" },
              { title: "Patterns", desc: "Dots, grid, diagonal patterns with adjustable opacity.", tag: "Backgrounds" },
              { title: "Drop Shadows", desc: "Full control: X/Y offset, blur, spread, color.", tag: "Effects" },
              { title: "3D Transforms", desc: "Perspective rotation with adjustable scale.", tag: "Effects" },
              { title: "High-Res Export", desc: "2x PNG export, crisp on Retina displays.", tag: "Export" },
              { title: "Privacy First", desc: "All processing in-browser. Nothing leaves your device.", tag: "Privacy" },
            ].map((f) => (
              <div
                key={f.title}
                className="p-3.5 sm:p-5 rounded-2xl border border-[#e4e4e7] bg-white hover:border-[#6366f1]/30 transition-all"
              >
                <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[11px] font-semibold bg-[#6366f1]/10 text-[#6366f1] mb-2 sm:mb-3">
                  {f.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-1.5">{f.title}</h3>
                <p className="text-[10px] sm:text-xs text-[#71717a] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="faq">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {[
              { q: "Is FrameShot free?", a: "Yes, 100% free. No premium tiers, no usage limits, no hidden costs." },
              { q: "Do I need an account?", a: "No signup required. Just open the editor and start." },
              { q: "Are my screenshots uploaded?", a: "No. Everything happens locally in your browser using Canvas API." },
              { q: "What formats are supported?", a: "Upload PNG, JPG, WebP or paste from clipboard. Export as 2x PNG." },
              { q: "Can I use it commercially?", a: "Absolutely. Free for personal and commercial use." },
              { q: "Does it work on mobile?", a: "Best on desktop. Mobile support is limited but basic functions work." },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[#e4e4e7] bg-white"
              >
                <summary className="p-4 sm:p-5 font-medium text-xs sm:text-sm list-none flex items-center justify-between cursor-pointer">
                  {faq.q}
                  <span className="text-[#a1a1aa] group-open:rotate-45 transition-transform text-base sm:text-lg leading-none flex-shrink-0 ml-2">
                    +
                  </span>
                </summary>
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#71717a] leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#e4e4e7]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Ready to Beautify?
          </h2>
          <p className="text-sm sm:text-base text-[#71717a] mb-6 sm:mb-8">
            Free, fast, and private. No signup needed.
          </p>
          <Link
            href="/editor"
            className="inline-flex px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-colors text-sm sm:text-base shadow-lg shadow-[#6366f1]/25"
          >
            Open FrameShot Editor →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e4e4e7] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
              FrameShot
            </span>
          </div>
          <nav className="flex items-center gap-5 sm:gap-6 text-[10px] sm:text-xs text-[#71717a]">
            <a href="/editor" className="hover:text-[#18181b]">Editor</a>
            <a href="#features" className="hover:text-[#18181b]">Features</a>
            <a href="#faq" className="hover:text-[#18181b]">FAQ</a>
          </nav>
          <p className="text-[10px] sm:text-xs text-[#71717a]">
            © {new Date().getFullYear()} FrameShot
          </p>
        </div>
      </footer>
    </div>
  );
}
