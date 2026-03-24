import { Space_Grotesk, Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/preloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${pixelifySans.variable}`}
    >
      <body className="font-body text-on-surface antialiased hide-scrollbar">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
