import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        // Royal Beauty Salon Warsaw — brown & gold luxury palette
        brown: {
          50: "#F6F0EB",
          100: "#E8D9CD",
          200: "#D0B4A0",
          300: "#A8836C",
          400: "#856249",
          500: "#6A4B3C", // Warm Brown
          600: "#5A3E31",
          700: "#4A352A", // Dark Luxury Brown
          800: "#382519",
          900: "#241710",
          DEFAULT: "#6A4B3C",
        },
        gold: {
          50: "#FBF6E6",
          100: "#F6EAC0",
          200: "#EFD98C",
          300: "#E8C56A", // Soft Gold
          400: "#DEB94C",
          500: "#D4AF37", // Premium Gold
          600: "#AE8C24",
          700: "#876C1B",
          800: "#5C4912",
          900: "#312709",
          DEFAULT: "#D4AF37",
        },
        cream: {
          DEFAULT: "#F6F1EA",
          dark: "#EDE3D6",
        },
        "luxury-black": "#2D211A", // deep espresso for dark sections
        charcoal: "#4A352A", // body text — dark luxury brown

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        luxury: "0 20px 60px -15px rgba(74, 53, 42, 0.25)",
        gold: "0 10px 40px -10px rgba(212, 175, 55, 0.35)",
        soft: "0 8px 30px rgba(45, 33, 26, 0.07)",
      },
      backgroundImage: {
        "brown-gradient": "linear-gradient(135deg, #6A4B3C 0%, #D4AF37 100%)",
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #E8C56A 50%, #D4AF37 100%)",
        "luxury-radial": "radial-gradient(ellipse at top, rgba(212,175,55,0.14), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
