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
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-icon.svg" alt="FrameShot" className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#4facfe] bg-clip-text text-transparent">
              FrameShot
            </span>
          </Link>
          <Link
            href="/editor"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#4facfe] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Open Editor →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/10 via-transparent to-[#4facfe]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)] mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Free • No Signup • Browser-Based
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Turn Screenshots into
            <br />
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#4facfe] bg-clip-text text-transparent">
              Stunning Visuals
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            FrameShot beautifies your raw screenshots with device mockups, gradient backgrounds, shadows, and 3D effects — perfect for social media, presentations, and blogs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#4facfe] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#667eea]/25"
            >
              Beautify Your Screenshot — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-16 max-w-xl mx-auto">
            Three simple steps to transform any screenshot into a professional visual.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Screenshot",
                desc: "Drag & drop, click to browse, or paste from clipboard (Ctrl+V). Supports PNG, JPG, and WebP.",
                icon: "📸",
              },
              {
                step: "2",
                title: "Customize the Look",
                desc: "Choose gradient backgrounds, add device mockup frames (iPhone, iPad, MacBook), adjust padding, shadows, and 3D effects.",
                icon: "🎨",
              },
              {
                step: "3",
                title: "Export & Share",
                desc: "Download your beautified screenshot as a high-resolution PNG (2x). Perfect for Twitter, LinkedIn, Product Hunt, and more.",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[#667eea]/50 transition-colors"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <div className="absolute top-6 right-6 text-5xl font-black text-[var(--border-color)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-16 max-w-xl mx-auto">
            Everything you need to make your screenshots look professional.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Device Mockup Frames",
                desc: "iPhone 15, iPhone 15 Pro, Pixel 8, iPad Pro, MacBook Pro, Chrome, Safari, and Firefox browser frames.",
                tag: "Mockups",
              },
              {
                title: "Gradient Backgrounds",
                desc: "12 handpicked gradient presets plus custom color pickers. Linear, radial, and diagonal directions.",
                tag: "Backgrounds",
              },
              {
                title: "Pattern Overlays",
                desc: "Add dots, grid, or diagonal line patterns with adjustable opacity and scale.",
                tag: "Patterns",
              },
              {
                title: "Drop Shadows",
                desc: "Customizable box shadow with X/Y offset, blur, spread, and color control.",
                tag: "Effects",
              },
              {
                title: "3D Transforms",
                desc: "Perspective rotation on X/Y axes with adjustable scale for eye-catching presentations.",
                tag: "Effects",
              },
              {
                title: "High-Res Export",
                desc: "Export as 2x resolution PNG. Your screenshots will look crisp on any display, including Retina.",
                tag: "Export",
              },
              {
                title: "Clipboard Paste",
                desc: "Paste screenshots directly from your clipboard with Ctrl+V — no saving to disk required.",
                tag: "Workflow",
              },
              {
                title: "Privacy First",
                desc: "All processing happens in your browser. Your screenshots never leave your device.",
                tag: "Privacy",
              },
              {
                title: "No Signup Required",
                desc: "Just open and use. No accounts, no email, no tracking. Completely free.",
                tag: "Free",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#667eea]/40 transition-colors"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#667eea]/15 text-[#667eea] mb-3">
                  {f.tag}
                </span>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[var(--bg-secondary)]" id="use-cases">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Where to Use FrameShot
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-16 max-w-xl mx-auto">
            From app launches to technical blogs — FrameShot makes every screenshot presentation-ready.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Product Hunt Launch",
                desc: "Create eye-catching gallery images that stand out on Product Hunt listings.",
                emoji: "🏆",
              },
              {
                title: "Social Media Posts",
                desc: "Beautify app screenshots for Twitter/X, LinkedIn, Instagram, and Facebook.",
                emoji: "📱",
              },
              {
                title: "Blog Posts & Tutorials",
                desc: "Add professional device frames to screenshots in technical blog posts and docs.",
                emoji: "✍️",
              },
              {
                title: "Presentations",
                desc: "Make slide decks pop with 3D-transformed, shadowed screenshots.",
                emoji: "📊",
              },
              {
                title: "App Store Listings",
                desc: "Create polished app store screenshots with device mockup frames.",
                emoji: "🏪",
              },
              {
                title: "Email Newsletters",
                desc: "Feature product updates with beautifully framed screenshots.",
                emoji: "📧",
              },
              {
                title: "Documentation",
                desc: "Improve readability of technical docs with consistent, framed screenshots.",
                emoji: "📖",
              },
              {
                title: "Client Proposals",
                desc: "Present UI designs and prototypes professionally to clients.",
                emoji: "💼",
              },
            ].map((u) => (
              <div
                key={u.title}
                className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-center hover:border-[#667eea]/40 transition-colors"
              >
                <span className="text-3xl block mb-3">{u.emoji}</span>
                <h3 className="font-bold mb-2">{u.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is FrameShot completely free?",
                a: "Yes! FrameShot is 100% free to use with no hidden costs, premium tiers, or usage limits. All features are available to everyone.",
              },
              {
                q: "Do I need to create an account?",
                a: "No. FrameShot works entirely in your browser with zero signup. Just open the editor and start beautifying your screenshots.",
              },
              {
                q: "Are my screenshots uploaded to a server?",
                a: "No. All image processing happens locally in your browser using Canvas API. Your screenshots never leave your device, ensuring complete privacy.",
              },
              {
                q: "What image formats are supported?",
                a: "FrameShot accepts PNG, JPG, and WebP images for upload. You can also paste images directly from your clipboard using Ctrl+V. Exports are in high-resolution PNG format.",
              },
              {
                q: "Can I use FrameShot for commercial projects?",
                a: "Absolutely. FrameShot is free for personal and commercial use. Use the exported images anywhere — app stores, marketing materials, client work, and more.",
              },
              {
                q: "What device mockups are available?",
                a: "FrameShot currently offers iPhone 15, iPhone 15 Pro, Pixel 8, iPad Pro, MacBook Pro, and browser frames for Chrome, Safari, and Firefox. More devices are being added regularly.",
              },
              {
                q: "What resolution are the exports?",
                a: "Exports are generated at 2x resolution by default, making them crisp on Retina displays and high-DPI screens. The output is a high-quality PNG file.",
              },
              {
                q: "Can I use FrameShot on mobile devices?",
                a: "FrameShot works best on desktop browsers (Chrome, Firefox, Safari, Edge). Mobile support is limited but basic editing functions are available.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] cursor-pointer"
              >
                <summary className="font-semibold text-lg list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-[var(--text-secondary)] group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#667eea]/10 via-[var(--bg-secondary)] to-[#4facfe]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Beautify Your Screenshots?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">
            Join thousands of developers, designers, and content creators who use FrameShot to make their screenshots look professional.
          </p>
          <Link
            href="/editor"
            className="inline-flex px-10 py-4 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#4facfe] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#667eea]/25"
          >
            Open FrameShot Editor — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-12 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo-icon.svg" alt="FrameShot" className="w-8 h-8" />
              <span className="font-bold bg-gradient-to-r from-[#667eea] to-[#4facfe] bg-clip-text text-transparent">
                FrameShot
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <a href="/editor" className="hover:text-white transition-colors">
                Editor
              </a>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#use-cases" className="hover:text-white transition-colors">
                Use Cases
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </nav>
            <p className="text-sm text-[var(--text-secondary)]">
              © {new Date().getFullYear()} FrameShot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
