import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // components klasörünüz
    "./services/**/*.{js,ts,jsx,tsx,mdx}", // services klasörünüz
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
