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
                    // text: '#9F543E',
                    // light: '#CE7C56',
                    // dark: '#73372D',
                    100: 'hsl(19, 55%, 97%)',
                    200: 'hsl(19, 55%, 87%)',
                    300: 'hsl(19, 55%, 77%)',
                    400: 'hsl(19, 55%, 67%)',
                    500: 'hsl(19, 55%, 57%)',
                    600: 'hsl(19, 55%, 47%)',
                    700: 'hsl(19, 55%, 37%)',
                    800: 'hsl(19, 55%, 27%)',
                    900: 'hsl(19, 55%, 17%)',
                    DEFAULT: 'hsl(19, 54%, 57%)'
                }
            }
        }
    },
    plugins: [formsPlugin]
}
