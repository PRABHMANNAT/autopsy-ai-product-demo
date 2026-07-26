import type { Metadata } from "next";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    (host ? `${protocol}://${host}` : "http://localhost:5176");
  const socialImage = new URL("/og.png", origin).toString();
  const title = "VentureVerdict — Launch with evidence";
  const description =
    "AI startup autopsies, product audits and human validation campaigns in one evidence-first platform.";

  return {
    title: {
      default: title,
      template: "%s · VentureVerdict",
    },
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: socialImage, width: 1736, height: 920, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
