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
        background: "#121212", // Stone Grey
        foreground: "#E5E7EB", // Off-White
        card: "#1C1917", // Elevated Stone
        "card-hover": "#292524", // Stone-800
        primary: "#3B82F6", // Cyber Blue
        "cyber-blue": "#3B82F6", // Primary Blue
        "cyber-glow": "#60A5FA", // Glow Blue
        "stone-grey": "#121212", // Deep Stone Grey
        "elevated-stone": "#1C1917", // Elevated Stone
        "muted-stone": "#A8A29E", // Muted Stone
        "stone-800": "#292524", // Stone-800
        "off-white": "#E5E7EB", // Off-White
        
        // Legacy/Compatibility keys mapped to new palette
        "matrix-green": "#3B82F6", 
        "gray-light": "#A8A29E", 
        "gray-dark": "#57534E", 
        border: "#292524", 
        "border-active": "#3B82F6", 
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "Courier New", "monospace"],
        heading: ["var(--font-press-start-2p)", "Press Start 2P", "monospace"],
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
      },
      boxShadow: {
        hard: "4px 4px 0px #3B82F6",
        "hard-sm": "2px 2px 0px #3B82F6",
        "hard-lg": "6px 6px 0px #3B82F6",
        "hard-white": "4px 4px 0px #E5E7EB",
        "hard-none": "0px 0px 0px #3B82F6",
        glow: "0 0 5px #60A5FA, 0 0 10px #60A5FA",
        "glow-lg": "0 0 10px #60A5FA, 0 0 20px #60A5FA, 0 0 30px #60A5FA",
        "inner-glow": "inset 0 0 30px rgba(96, 165, 250, 0.05)",
        "glass": "inset 0 0 30px rgba(96, 165, 250, 0.05), 4px 4px 0px #292524",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #60A5FA, 0 0 10px #60A5FA" },
          "50%": {
            boxShadow: "0 0 10px #60A5FA, 0 0 20px #60A5FA, 0 0 30px #60A5FA",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
