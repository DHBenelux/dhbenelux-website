import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Design System Colors
        teal: {
          50: 'hsl(var(--teal-50))',
          100: 'hsl(var(--teal-100))',
          200: 'hsl(var(--teal-200))',
          300: 'hsl(var(--teal-300))',
          400: 'hsl(var(--teal-400))',
          500: 'hsl(var(--teal-500))',
          600: 'hsl(var(--teal-600))',
          700: 'hsl(var(--teal-700))',
          800: 'hsl(var(--teal-800))',
          900: 'hsl(var(--teal-900))',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-lato)',
          'Lato',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'monospace',
        ],
        serif: ['var(--font-merriweather)', 'Merriweather', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '96': '24rem',
        'screen-75': '75vh',
        'screen-90': '90vh',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        medium:
          '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        large:
          '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        colored:
          '0 4px 25px -5px rgba(13, 148, 136, 0.2), 0 10px 10px -5px rgba(13, 148, 136, 0.1)', // Updated to Teal-600
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#292524', // stone-800
            lineHeight: '1.7',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            h1: {
              fontSize: '2.25em',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '0.8888889em',
              color: '#292524', // stone-800
            },
            h2: {
              fontSize: '1.5em',
              fontWeight: '600',
              lineHeight: '1.3333333',
              marginTop: '2em',
              marginBottom: '1em',
              color: '#292524', // stone-800
            },
            h3: {
              fontSize: '1.25em',
              fontWeight: '600',
              lineHeight: '1.6',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              color: '#292524', // stone-800
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: '#0d9488', // teal-600
              borderLeftWidth: '4px',
              paddingLeft: '1em',
              backgroundColor: '#fafaf9', // stone-50
              paddingTop: '1em',
              paddingBottom: '1em',
              marginTop: '1.6em',
              marginBottom: '1.6em',
            },
            code: {
              backgroundColor: '#f5f5f4', // stone-100
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '600',
              color: '#0f766e', // teal-700
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1c1917', // stone-900
              color: '#fafaf9', // stone-50
              borderRadius: '0.5rem',
              paddingTop: '1rem',
              paddingRight: '1rem',
              paddingBottom: '1rem',
              paddingLeft: '1rem',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0',
            },
            a: {
              color: '#0d9488', // teal-600
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#0f766e', // teal-700
              },
            },
            table: {
              width: '100%',
              marginTop: '2em',
              marginBottom: '2em',
              borderCollapse: 'collapse',
            },
            th: {
              backgroundColor: '#fafaf9', // stone-50
              borderBottom: '1px solid #d6d3d1', // stone-300
              borderTop: '1px solid #d6d3d1', // stone-300
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            td: {
              borderBottom: '1px solid #e7e5e4', // stone-200
              padding: '0.75rem',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.8',
            h1: {
              fontSize: '2.75em',
            },
            h2: {
              fontSize: '1.75em',
            },
            h3: {
              fontSize: '1.375em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
