/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'src/pages/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            screens: {
                'wide': '1950px',
                'desktop': {'max': '1440px',},
                'laptop': {'max': '1200px',},
                'm-tablet': {'max': '990px',},
                'tablet': {'max': '640px',},
                'mobile': {'max': '380px',},
            },
            colors: {
                'main': '#7DA2B0',
                'primary': '#e9b6fc',
                'light-accent': '#89776D',
                'dark-accent': '#67646F',
                'light-shade': '#F2F1F2',
                'dark-shade': '#23343F',
            },
        },
    },
    plugins: [],
}