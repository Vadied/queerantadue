import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        background: {
          lighter: '#2e374a', // gray-800
          light: '#182237', // gray-900
          DEFAULT: '#151c2c' // gray-950
        },
        text: {
          light: '#b7bac1', // gray-300
          DEFAULT: '#ffffff' // white
        },
        link: {
          DEFAULT: '#5d57c9' // violet-600
        },
        gray: {
          lighter: '#f9fafb', // gray-50
          light: '#f3f4f6', // gray-100
          DEFAULT: '#ffffff', // white
          dark: '#374151' // gray-700
        },
        white: {
          DEFAULT: '#ffffff' // white
        },
        black: {
          DEFAULT: '#000000' // black
        },
        border: {
          DEFAULT: '#e5e7eb' // gray-200
        },
        ring: {
          DEFAULT: '#e5e7eb' // gray-200
        },
        danger: {
          DEFAULT: '#ef4444', // red-500
        },
        button: {
          primary: '#5d57c9', // violet-600
          danger: '#ef4444', // red-500
          success: 'teal', // teal-500
        },
        content: {
          subtle: '#9ca3af', // gray-400
          DEFAULT: '#6b7280', // gray-500
          emphasis: '#374151', // gray-700
          strong: '#111827', // gray-900
          inverted: '#ffffff' // white
        }
      },
      boxShadow: {
        input: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        dropdown:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        small: '0.375rem',
        default: '0.5rem',
        full: '9999px'
      },
      fontSize: {
        label: '0.75rem',
        default: ['0.875rem', { lineHeight: '1.25rem' }],
        title: ['1.125rem', { lineHeight: '1.75rem' }],
        metric: ['1.875rem', { lineHeight: '2.25rem' }]
      }
    }
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    }
  ]
} satisfies Config;
