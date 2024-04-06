import formsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(50px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out'
            },
            colors: {
                copper: {
                    light: '#CE7C56',
                    DEFAULT: '#9F543E',
                    dark: '#73372D'
                }
            }
        }
    },
    plugins: [formsPlugin]
}
