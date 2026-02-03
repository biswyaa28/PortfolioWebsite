import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#ffffff",
                card: "#1a1a1a",
                "card-hover": "#222222",
                "cyber-green": "#00ff9d",
                "electric-blue": "#0066ff",
                "gray-light": "#a0a0a0",
                "gray-dark": "#404040",
            },
            fontFamily: {
                sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Courier New', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 5px #00ff9d, 0 0 10px #00ff9d' },
                    '50%': { boxShadow: '0 0 10px #00ff9d, 0 0 20px #00ff9d, 0 0 30px #00ff9d' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
