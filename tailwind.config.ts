import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			/* ── Brand design tokens ── */
  			'brand-green-light':       '#eef6e8',
  			'brand-green-mid':         '#f4f7f2',
  			'brand-green-muted':       '#ddebd5',
  			'brand-green-accent':      '#d5e8cb',
  			'brand-green-soft':        '#90d170',
  			'brand-green-pale':        '#c8f0a8',
  			'brand-green-deep':        '#3a632b',
  			'brand-green-vivid':       '#6db33f',
  			/* CTA-Buttons: WCAG AA mit weißem Text (#4f802e = 4.71:1) */
  			'brand-green-cta':         '#4f802e',
  			'brand-green-cta-hover':   '#3d6624',
  			/* Amber-Akzent für Sterne, Zahlen-Highlights */
  			'brand-amber':             '#D97706',
  			'brand-stone-light':       '#f5f3ee',
  			'brand-stone-mid':         '#ede9e2',
  			'brand-stone-muted':       '#e0dbd1',
  			'brand-image-placeholder': '#e8f0e4',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans:  ["var(--font-sans)",  "ui-sans-serif", "system-ui", "sans-serif"],
  			serif: ["var(--font-serif)", "ui-serif",      "Georgia",   "serif"],
  		},
  		zIndex: {
  			base:     '10',
  			header:   '50',
  			overlay:  '60',
  			whatsapp: '40',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to:   { height: 'var(--radix-accordion-content-height)' },
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to:   { height: '0' },
  			},
  			'scroll-left': {
  				from: { transform: 'translateX(0)' },
  				to:   { transform: 'translateX(-50%)' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up':   'accordion-up 0.2s ease-out',
  			'scroll-left':    'scroll-left 28s linear infinite',
  		}
  	}
  },
  plugins: [],
};
export default config;
