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
            <a href="#examples" className="hover:text-[#18181b] transition-colors">Örnekler</a>
            <a href="#features" className="hover:text-[#18181b] transition-colors">Özellikler</a>
            <a href="#faq" className="hover:text-[#18181b] transition-colors">SSS</a>
          </nav>
          <Link
            href="/editor"
            className="px-4 sm:px-5 py-2 rounded-lg bg-[#6366f1] hover:bg-[#818cf8] text-white font-medium text-sm transition-colors"
          >
            Editörü Aç
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e4e4e7] bg-[#f4f4f5] text-[10px] sm:text-xs font-medium text-[#71717a] mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Ücretsiz · Kayıt Gerekmez · Tarayıcı Tabanlı
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Ekran Görüntülerini
            <br />
            <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
              Güzelleştir
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-[#71717a] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Cihaz mockup&apos;ları, gradient arka planlar, gölgeler ve 3D efektler ekle. Sosyal medya, sunumlar ve bloglar için mükemmel.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-colors text-sm sm:text-base shadow-lg shadow-[#6366f1]/25"
            >
              Başla →
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase — Example Mockups */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="examples">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Neler Yapabilirsin?</h2>
            <p className="text-sm sm:text-base text-[#71717a]">Farklı cihaz frame&apos;leri ve arka planlarla örnek sonuçlar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example 1: iPhone */}
            <MockupCard
              gradient="linear-gradient(135deg, #667eea, #764ba2)"
              title="iPhone Mockup"
              desc="Mor gradient ile telefon frame"
              device="phone"
            />
            {/* Example 2: MacBook */}
            <MockupCard
              gradient="linear-gradient(135deg, #4facfe, #00f2fe)"
              title="MacBook Mockup"
              desc="Mavi gradient ile laptop frame"
              device="laptop"
            />
            {/* Example 3: Browser Chrome */}
            <MockupCard
              gradient="linear-gradient(135deg, #43e97b, #38f9d7)"
              title="Chrome Frame"
              desc="Yeşil gradient ile tarayıcı"
              device="browser"
            />
            {/* Example 4: No device */}
            <MockupCard
              gradient="linear-gradient(135deg, #fa709a, #fee140)"
              title="Sadece Gradient"
              desc="Cihaz frame olmadan"
              device="none"
            />
            {/* Example 5: iPad */}
            <MockupCard
              gradient="linear-gradient(135deg, #a18cd1, #fbc2eb)"
              title="iPad Mockup"
              desc="Pastel gradient ile tablet"
              device="tablet"
            />
            {/* Example 6: Shadow */}
            <MockupCard
              gradient="linear-gradient(135deg, #0c0c0c, #434343)"
              title="Koyu Tema"
              desc="Koyu gradient + gölge efekti"
              device="none"
              dark
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Nasıl Çalışır?</h2>
            <p className="text-sm sm:text-base text-[#71717a]">Üç basit adımda herhangi bir ekran görüntüsünü dönüştür.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Yükle", desc: "Sürükle & bırak, tıkla veya panodan yapıştır. PNG, JPG, WebP desteklenir.", icon: "📸" },
              { step: "02", title: "Özelleştir", desc: "Gradient, cihaz frame, gölge, padding ve 3D efekt seç. Kırpma aracıyla düzenle.", icon: "🎨" },
              { step: "03", title: "İndir", desc: "Yüksek çözünürlüklü 2x PNG olarak dışa aktar. Sosyal medyaya hazır.", icon: "✨" },
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
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Özellikler</h2>
            <p className="text-sm sm:text-base text-[#71717a]">İhtiyacınız olan her şey, fazlası değil.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: "Cihaz Mockup", desc: "iPhone 15, Pixel 8, iPad, MacBook, Chrome, Safari, Firefox frame'leri.", tag: "Mockup" },
              { title: "Gradientler", desc: "12 hazır preset + özel renkler. Doğrusal, radyal, çapraz.", tag: "Arka Plan" },
              { title: "Görsel Kırpma", desc: "Yükleip sonra kırp. Serbest veya sabit oranlarla.", tag: "Düzenleme" },
              { title: "Sığdırma", desc: "Contain, cover veya fill — frame'de nasıl görüneceğini seç.", tag: "Düzenleme" },
              { title: "Desenler", desc: "Nokta, ızgara, çapraz desenler ayarlanabilir opaklıkla.", tag: "Arka Plan" },
              { title: "Gölgeler", desc: "X/Y kayma, blur ve renk kontrolü.", tag: "Efekt" },
              { title: "3D Dönüşüm", desc: "Perspektif rotasyonu ayarlanabilir ölçek ile.", tag: "Efekt" },
              { title: "Yüksek Çözünürlük", desc: "2x PNG dışa aktarım, Retina ekranlarda net.", tag: "Dışa Aktar" },
              { title: "Gizlilik", desc: "Tüm işlemler tarayıcıda. Hiçbir şey sunucuya gitmez.", tag: "Güvenlik" },
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
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">Sıkça Sorulan Sorular</h2>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {[
              { q: "FrameShot ücretsiz mi?", a: "Evet, %100 ücretsiz. Premium katman yok, kullanım limiti yok, gizli maliyet yok." },
              { q: "Hesap gerekiyor mu?", a: "Hayır. Editörü açın ve başlayın." },
              { q: "Ekran görüntülerim yükleniyor mu?", a: "Hayır. Her şey tarayıcınızda yerel olarak gerçekleşir. Canvas API kullanılır." },
              { q: "Hangi formatlar destekleniyor?", a: "PNG, JPG, WebP yükleyebilir veya panodan yapıştırabilirsiniz. 2x PNG olarak dışa aktarılır." },
              { q: "Ticari olarak kullanabilir miyim?", a: "Kesinlikle. Kişisel ve ticari kullanım için ücretsizdir." },
              { q: "Mobilde çalışır mı?", a: "Masaüstünde en iyi deneyim. Mobil desteği sınırlı ama temel işlevler çalışıyor." },
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
            Güzelleştirmeye Hazır mısın?
          </h2>
          <p className="text-sm sm:text-base text-[#71717a] mb-6 sm:mb-8">
            Ücretsiz, hızlı ve gizli. Kayıt gerekmez.
          </p>
          <Link
            href="/editor"
            className="inline-flex px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#6366f1] hover:bg-[#818cf8] text-white font-semibold transition-colors text-sm sm:text-base shadow-lg shadow-[#6366f1]/25"
          >
            Editörü Aç →
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
            <a href="/editor" className="hover:text-[#18181b]">Editör</a>
            <a href="#features" className="hover:text-[#18181b]">Özellikler</a>
            <a href="#faq" className="hover:text-[#18181b]">SSS</a>
          </nav>
          <p className="text-[10px] sm:text-xs text-[#71717a]">
            © {new Date().getFullYear()} FrameShot
          </p>
        </div>
      </footer>
    </div>
  );
}

function MockupCard({ gradient, title, desc, device, dark }: {
  gradient: string;
  title: string;
  desc: string;
  device: "phone" | "laptop" | "browser" | "tablet" | "none";
  dark?: boolean;
}) {
  const textColor = dark ? "text-white" : "text-[#3f3f46]";
  const mutedText = dark ? "text-white/60" : "text-[#a1a1aa]";

  return (
    <div className="group rounded-2xl border border-[#e4e4e7] overflow-hidden hover:shadow-xl hover:shadow-[#6366f1]/10 hover:border-[#6366f1]/30 transition-all">
      {/* Preview */}
      <div
        className="aspect-[4/3] flex items-center justify-center p-6 relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="relative">
          {device === "phone" && (
            <div className={`w-20 h-36 sm:w-24 sm:h-44 rounded-2xl border-2 ${dark ? "border-white/30" : "border-white/50"} bg-white/10 backdrop-blur-sm overflow-hidden`}>
              <div className={`h-5 ${dark ? "bg-white/10" : "bg-white/20"} flex items-center justify-center`}>
                <div className="w-8 h-3 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 flex items-center justify-center p-2">
                <div className={`w-full h-full rounded ${dark ? "bg-white/20" : "bg-white/30"}`} />
              </div>
              <div className="h-2 flex items-center justify-center">
                <div className="w-4 h-0.5 rounded-full bg-white/30" />
              </div>
            </div>
          )}
          {device === "laptop" && (
            <div className="w-36 sm:w-44">
              <div className={`rounded-t-lg border-2 border-b-0 ${dark ? "border-white/30" : "border-white/50"} bg-white/10 backdrop-blur-sm p-1`}>
                <div className={`h-3 ${dark ? "bg-white/10" : "bg-white/20"} rounded-sm flex items-center px-1 gap-0.5`}>
                  <div className="w-1 h-1 rounded-full bg-red-400/60" />
                  <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
                  <div className="w-1 h-1 rounded-full bg-green-400/60" />
                </div>
                <div className={`aspect-[16/10] rounded ${dark ? "bg-white/20" : "bg-white/30"} mt-1`} />
              </div>
              <div className={`h-1.5 ${dark ? "bg-white/20" : "bg-white/40"} rounded-b-lg mx-2`} />
            </div>
          )}
          {device === "browser" && (
            <div className={`w-36 sm:w-44 rounded-lg border-2 ${dark ? "border-white/30" : "border-white/50"} bg-white/10 backdrop-blur-sm overflow-hidden`}>
              <div className={`h-4 ${dark ? "bg-white/10" : "bg-white/20"} flex items-center px-2 gap-1`}>
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                <div className={`flex-1 h-1.5 rounded-full ${dark ? "bg-white/10" : "bg-white/20"} mx-2`} />
              </div>
              <div className={`aspect-[16/10] ${dark ? "bg-white/20" : "bg-white/30"}`} />
            </div>
          )}
          {device === "tablet" && (
            <div className={`w-28 h-36 sm:w-32 sm:h-40 rounded-xl border-2 ${dark ? "border-white/30" : "border-white/50"} bg-white/10 backdrop-blur-sm overflow-hidden`}>
              <div className="flex-1 flex items-center justify-center p-2">
                <div className={`w-full h-full rounded ${dark ? "bg-white/20" : "bg-white/30"}`} />
              </div>
              <div className="h-3 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-white/30" />
              </div>
            </div>
          )}
          {device === "none" && (
            <div className={`w-28 h-20 sm:w-32 sm:h-24 rounded-xl ${dark ? "bg-white/15" : "bg-white/25"} backdrop-blur-sm shadow-lg`} />
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
