import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://screenshot-beautifier-ashy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FrameShot — Free Screenshot Beautifier & Mockup Generator",
    template: "%s | FrameShot",
  },
  description:
    "Transform raw screenshots into stunning visuals for social media, presentations, and blogs. Add device mockups, gradients, shadows, and 3D effects. Free online tool — no signup required.",
  keywords: [
    "screenshot beautifier",
    "screenshot editor",
    "screenshot mockup generator",
    "device mockup",
    "iPhone mockup",
    "screenshot tool",
    "free screenshot editor",
    "social media screenshot",
    "screenshot frames",
    "screenshot overlay",
    "online screenshot tool",
    "presentation screenshots",
    "blog screenshots",
    "app screenshot generator",
    "ekran görüntüsü düzenleyici",
    "ekran görüntüsü güzelleştirici",
  ],
  authors: [{ name: "FrameShot", url: siteUrl }],
  creator: "FrameShot",
  publisher: "FrameShot",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "tr_TR",
    url: siteUrl,
    siteName: "FrameShot",
    title: "FrameShot — Free Screenshot Beautifier & Mockup Generator",
    description:
      "Transform raw screenshots into stunning visuals. Add device mockups, gradients, shadows, and 3D effects. Free — no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FrameShot — Screenshot Beautifier Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrameShot — Free Screenshot Beautifier & Mockup Generator",
    description:
      "Transform raw screenshots into stunning visuals. Add device mockups, gradients, shadows, and 3D effects.",
    images: ["/og-image.png"],
    creator: "@frameshot",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/logo-icon.svg",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "FrameShot",
        url: siteUrl,
        description:
          "Free online screenshot beautifier and mockup generator. Transform raw screenshots into stunning visuals for social media, presentations, and blogs.",
        applicationCategory: "DesignApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Screenshot beautification",
          "Device mockup frames (iPhone, iPad, MacBook, Pixel)",
          "Gradient backgrounds",
          "Pattern overlays (dots, grid, diagonal)",
          "Adjustable padding and border radius",
          "Drop shadow effects",
          "3D transform effects",
          "PNG export with 2x resolution",
          "No signup required",
          "Free to use",
        ],
        screenshot: `${siteUrl}/og-image.png`,
        logo: `${siteUrl}/logo.svg`,
      },
      {
        "@type": "Organization",
        name: "FrameShot",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
      },
      {
        "@type": "WebSite",
        name: "FrameShot",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is FrameShot free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, FrameShot is completely free to use. No signup or account is required. Simply upload your screenshot and start editing.",
            },
          },
          {
            "@type": "Question",
            name: "What image formats does FrameShot support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "FrameShot supports PNG, JPG, and WebP image uploads. You can also paste images directly from your clipboard using Ctrl+V. Exports are available in PNG format with 2x resolution.",
            },
          },
          {
            "@type": "Question",
            name: "Can I add device mockup frames to my screenshots?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! FrameShot offers device mockup frames including iPhone 15, iPhone 15 Pro, Pixel 8, iPad Pro, MacBook Pro, and browser frames for Chrome, Safari, and Firefox.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to create an account to use FrameShot?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, FrameShot requires no signup or account creation. It works entirely in your browser — your images are never uploaded to any server.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
