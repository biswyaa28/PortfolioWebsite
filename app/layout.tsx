import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains-mono',
});

const pressStart2P = Press_Start_2P({
    subsets: ["latin"],
    weight: "400",
    variable: '--font-press-start-2p',
});

export const metadata: Metadata = {
  title: "Biswajeet Rout | Cybersecurity Engineer",
  description:
    "Portfolio of Biswajeet Rout - Cybersecurity Engineer & BTech CSE Student. Securing the Digital Frontier, One Line of Code at a Time.",
  keywords: [
    "cybersecurity",
    "security engineer",
    "C++",
    "network security",
    "portfolio",
  ],
  authors: [{ name: "Biswajeet Rout" }],
  openGraph: {
    title: "Biswajeet Rout | Cybersecurity Engineer",
    description:
      "Portfolio of Biswajeet Rout - Cybersecurity Engineer & BTech CSE Student",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable}`} suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <div className="noise-texture" aria-hidden="true" />
                <div className="crt-overlay" aria-hidden="true" />
                <div className="crt-vignette" aria-hidden="true" />
                {children}
            </body>
        </html>
    );
}
