import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
    title: "Biswajeet Rout | Cybersecurity Engineer",
    description: "Portfolio of Biswajeet Rout - Cybersecurity Engineer & BTech CSE Student. Securing the Digital Frontier, One Line of Code at a Time.",
    keywords: ["cybersecurity", "security engineer", "C++", "network security", "portfolio"],
    authors: [{ name: "Biswajeet Rout" }],
    openGraph: {
        title: "Biswajeet Rout | Cybersecurity Engineer",
        description: "Portfolio of Biswajeet Rout - Cybersecurity Engineer & BTech CSE Student",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
