import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FrameShot — Free Screenshot Beautifier & Mockup Generator",
  description:
    "Transform raw screenshots into stunning visuals for social media, presentations, and blogs. Add device mockups, gradients, shadows, and 3D effects. Free — no signup.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo-icon.svg" alt="FrameShot" className="w-8 h-8" />
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
              FrameShot
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
            <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
          </nav>
          <Link
            href="/editor"
            className="px-5 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-sm transition-colors"
          >
            Open Editor
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-medium text-[var(--text-secondary)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Free · No Signup · Browser-Based
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Beautify Your Screenshots
            <br />
            <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
            Add device mockups, gradient backgrounds, shadows, and 3D effects to your screenshots. Perfect for social media, presentations, and blogs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-8 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors text-base"
            >
              Start Beautifying →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">Three simple steps to transform any screenshot.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drag & drop, click, or paste from clipboard. PNG, JPG, WebP supported.",
                icon: "📸",
              },
              {
                step: "02",
                title: "Customize",
                desc: "Pick gradients, device frames, shadows, padding, and 3D transforms.",
                icon: "🎨",
              },
              {
                step: "03",
                title: "Export",
                desc: "Download as high-res 2x PNG. Ready for social media, docs, or presentations.",
                icon: "✨",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-colors text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-2">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" id="features">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Features</h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">Everything you need, nothing you don't.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Device Mockups", desc: "iPhone 15, Pixel 8, iPad, MacBook, Chrome, Safari, Firefox frames.", tag: "Mockups" },
              { title: "Gradient Backgrounds", desc: "12 presets + custom colors. Linear, radial, diagonal.", tag: "Backgrounds" },
              { title: "Pattern Overlays", desc: "Dots, grid, diagonal patterns with adjustable opacity.", tag: "Patterns" },
              { title: "Drop Shadows", desc: "Full control: X/Y offset, blur, spread, color.", tag: "Effects" },
              { title: "3D Transforms", desc: "Perspective rotation with adjustable scale.", tag: "Effects" },
              { title: "High-Res Export", desc: "2x PNG export, crisp on Retina displays.", tag: "Export" },
              { title: "Clipboard Paste", desc: "Ctrl+V to paste screenshots directly.", tag: "Workflow" },
              { title: "Privacy First", desc: "All processing in-browser. Nothing leaves your device.", tag: "Privacy" },
              { title: "No Signup", desc: "Just open and use. No accounts, no tracking.", tag: "Free" },
            ].map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-colors"
              >
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--accent-soft)] text-[var(--accent)] mb-3">
                  {f.tag}
                </span>
                <h3 className="text-sm font-bold mb-1.5">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 border-t border-[var(--border-color)]" id="use-cases">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Where to Use</h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">From app launches to technical blogs.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Product Hunt", emoji: "🏆" },
              { title: "Social Media", emoji: "📱" },
              { title: "Blog Posts", emoji: "✍️" },
              { title: "Presentations", emoji: "📊" },
              { title: "App Store", emoji: "🏪" },
              { title: "Newsletters", emoji: "📧" },
              { title: "Documentation", emoji: "📖" },
              { title: "Client Work", emoji: "💼" },
            ].map((u) => (
              <div
                key={u.title}
                className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-colors text-center"
              >
                <span className="text-2xl block mb-2">{u.emoji}</span>
                <span className="text-sm font-medium">{u.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" id="faq">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">FAQ</h2>
          </div>
          <div className="space-y-3">
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
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
              >
                <summary className="p-5 font-medium text-sm list-none flex items-center justify-between cursor-pointer">
                  {faq.q}
                  <span className="text-[var(--text-tertiary)] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--border-color)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Beautify?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Free, fast, and private. No signup needed.
          </p>
          <Link
            href="/editor"
            className="inline-flex px-8 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors"
          >
            Open FrameShot Editor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="FrameShot" className="w-6 h-6" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
              FrameShot
            </span>
          </div>
          <nav className="flex items-center gap-6 text-xs text-[var(--text-tertiary)]">
            <a href="/editor" className="hover:text-[var(--text-secondary)]">Editor</a>
            <a href="#features" className="hover:text-[var(--text-secondary)]">Features</a>
            <a href="#faq" className="hover:text-[var(--text-secondary)]">FAQ</a>
          </nav>
          <p className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} FrameShot
          </p>
        </div>
      </footer>
    </div>
  );
}
