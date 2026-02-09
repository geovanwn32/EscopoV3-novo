/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./index.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}",
        "./utils/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                green: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981', // Emerald 500 (Matches --accent-primary)
                    600: '#059669', // Emerald 600 (Matches --accent-secondary)
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                    950: '#022c22',
                },
                orange: {
                    50: '#FFF3E0',
                    100: '#FFE0B2',
                    200: '#FFCC80',
                    300: '#FFB74D',
                    400: '#FFA726',
                    500: '#FF9100', /* Firebase Orange Main */
                    600: '#F57C00',
                    700: '#E65100',
                    800: '#EF6C00',
                    900: '#E65100',
                },
                space: {
                    950: '#050505',
                    900: '#0A0A0A',
                    800: '#141414',
                    700: '#1F1F1F',
                    600: '#2E2E2E',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 15px rgba(255, 145, 0, 0.15)',
                'glow-hover': '0 0 25px rgba(255, 145, 0, 0.3)',
            }
        },
    },
    plugins: [],
}
