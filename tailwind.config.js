import formsPlugin from '@tailwindcss/forms'
import typograpyPlugin from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
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
                },
                'fade-ultra': {
                    '0%': {
                        opacity: '0',
                        filter: 'blur(10px)',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        filter: 'blur(5px)',
                        transform: 'scale(1.01)'
                    },
                    '100%': {
                        opacity: '0.25',
                        filter: 'blur(0)',
                        transform: 'scale(1)'
                    }
                }
            },
            animation: {
                'fade-up-slow': 'fade-in-up 0.6s ease-in-out',
                'fade-in-up': 'fade-in-up 0.3s ease-out',
                'fade-in-slow': 'fade-in 0.6s ease-in-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-ultra': 'fade-ultra 1s ease-out'
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
            },
            typography: ({ theme }) => ({
                wedding: {
                    css: {
                        '--tw-prose-body': theme('colors.white'),
                        '--tw-prose-headings': theme('colors.copper[200]'),
                        '--tw-prose-lead': theme('colors.pink[700]'),
                        '--tw-prose-links': theme('colors.copper[200]'),
                        '--tw-prose-bold': theme('colors.copper[200]'),
                        '--tw-prose-counters': theme('colors.pink[600]'),
                        '--tw-prose-bullets': theme('colors.pink[400]'),
                        '--tw-prose-hr': theme('colors.pink[300]'),
                        '--tw-prose-quotes': theme('colors.pink[900]'),
                        '--tw-prose-quote-borders': theme('colors.pink[300]'),
                        '--tw-prose-captions': theme('colors.pink[700]'),
                        '--tw-prose-code': theme('colors.pink[900]'),
                        '--tw-prose-pre-code': theme('colors.pink[100]'),
                        '--tw-prose-pre-bg': theme('colors.pink[900]'),
                        '--tw-prose-th-borders': theme('colors.pink[300]'),
                        '--tw-prose-td-borders': theme('colors.pink[200]'),
                        '--tw-prose-invert-body': theme('colors.pink[200]'),
                        '--tw-prose-invert-headings': theme('colors.white'),
                        '--tw-prose-invert-lead': theme('colors.pink[300]'),
                        '--tw-prose-invert-links': theme('colors.white'),
                        '--tw-prose-invert-bold': theme('colors.white'),
                        '--tw-prose-invert-counters': theme('colors.pink[400]'),
                        '--tw-prose-invert-bullets': theme('colors.pink[600]'),
                        '--tw-prose-invert-hr': theme('colors.pink[700]'),
                        '--tw-prose-invert-quotes': theme('colors.pink[100]'),
                        '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
                        '--tw-prose-invert-captions': theme('colors.pink[400]'),
                        '--tw-prose-invert-code': theme('colors.white'),
                        '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
                        '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
                        '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
                        '--tw-prose-invert-td-borders': theme('colors.pink[700]')
                    }
                }
            })
        }
    },
    plugins: [formsPlugin, typograpyPlugin]
}
