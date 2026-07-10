import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppChat } from "@/components/ui/whatsapp-chat";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Don Classic, Boutique Fashion in Ile-Ife",
  description:
    "Premium boutique fashion in Ile-Ife, Nigeria. Curated collections, quality fabrics, and timeless style from Don Classic.",
  icons: {
    icon: [
      { url: "/Don Classic-icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32" },
      { url: "/apple-icon.png", sizes: "180x180" }
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} light`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
        <WhatsAppChat />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
