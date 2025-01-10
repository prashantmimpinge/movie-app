import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#C3C8D4",
        background: "#093545",
        input: "#224957",
        primary: "#2BD17E",
        error: "#EB5757",
        card: "#092C39",
        cardHover: "#0829358C",
      },
      fontSize: {
        64: "64px",
        48: "48px",
        32: "32px",
        24: "24px",
        20: "20px",
        16: "16px",
        14: "14px",
        12: "12px",
      },
      spacing: {
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
        80: "80px",
        120: "120px",
        160: "160px",
        300: "300px"
      },
      lineHeight: {
        80: "80px",
        56: "56px",
        40: "40px",
        32: "32px",
        24: "24px",
        16: "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
