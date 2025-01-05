/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      display: ["group-hover"],
      colors: {
        button_hover: "#27272a",
        svg_color: "#a1a1aa",
        background: "#171717",
        background_light: "#1b1b1b",
        text: "#ffffff",
        text_background: "#27272a",
        text_secondary: "#6B7280",
        my_text: "#18181b",
        my_text_background: "#fafafa",
        my_text_secondary: "#a1a1aa",
        border_color: "#27272a",
        bg_dark: "#121212",
        bg_surface_dark: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
