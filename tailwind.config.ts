import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Thêm custom config ở đây
      // Ví dụ:
      // colors: {
      //   brand: "#ff6b00",
      // },
      // fontFamily: {
      //   heading: ["Poppins", "sans-serif"],
      // },
    },
  },
  plugins: [
    // Thêm plugins ở đây
    // Ví dụ: require("@tailwindcss/typography"),
  ],
};

export default config;





