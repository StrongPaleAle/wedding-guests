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
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        filter: 'blur(10px)',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        filter: 'blur(5px)',
                        transform: 'scale(1.025)'
                    },
                    '100%': {
                        opacity: '1',
                        filter: 'blur(0)',
                        transform: 'scale(1)'
                    }
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out',
                'fade-in': 'fade-in 0.3s ease-out'
            },
            colors: {
                copper: {
                    // text: '#9F543E',
                    // light: '#CE7C56',
                    // dark: '#73372D',
                    100: 'hsl(24, 92%, 97%)',
                    200: 'hsl(24, 92%, 87%)',
                    300: 'hsl(24, 92%, 77%)',
                    400: 'hsl(24, 92%, 67%)',
                    500: 'hsl(24, 92%, 57%)',
                    600: 'hsl(24, 92%, 47%)',
                    700: 'hsl(24, 92%, 37%)',
                    800: 'hsl(24, 92%, 27%)',
                    900: 'hsl(24, 92%, 17%)',
                    DEFAULT: 'hsl(24, 92%, 71%)'
                }
            }
        }
    },
    plugins: [formsPlugin]
}
