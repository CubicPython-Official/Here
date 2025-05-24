/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // ... other colors
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        container: "var(--radius-container)", // Added for auth input
      },
      spacing: { // Added for consistency
        section: "var(--spacing-section)",
        container: "var(--spacing-container)",
        element: "var(--spacing-element)",
        item: "var(--spacing-item)",
      },
      gap: { // Added for consistency
        section: "var(--spacing-section)",
        container: "var(--spacing-container)",
        element: "var(--spacing-element)",
        item: "var(--spacing-item)",
      }
    },
  },
  plugins: [],
};
