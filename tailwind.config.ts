import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16211C",
        mist: "#F4F1E8",
        soil: "#C97A3D",
        leaf: "#2F7A4B",
        sun: "#F0C45A",
        clay: "#E7D5B8"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(22, 33, 28, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
