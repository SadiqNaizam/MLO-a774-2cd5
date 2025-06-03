import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))', // Updated via CSS var
					foreground: 'hsl(var(--sidebar-foreground))' // Updated via CSS var
          // Other sidebar color keys (primary, accent, etc.) removed as not specified in PRD simple sidebar color
				},
        // Direct PRD color palette for utility class usage
        prd: {
          background: '#F3F4F6',
          surface: '#FFFFFF',
          sidebar: '#E4E6EB',
          primaryText: '#1C1E21',
          secondaryText: '#606770',
          accentBlue: '#1877F2',
          accentRed: '#FA383E',
          iconGray: '#8F9398',
          borderGray: '#DADDE1',
        }
			},
			borderRadius: {
				lg: 'var(--radius)', // now 0.375rem (rounded-md from PRD)
				md: 'calc(var(--radius) - 2px)', // now 0.375rem - 2px (approx. rounded)
				sm: 'calc(var(--radius) - 4px)', // now 0.375rem - 4px (approx. rounded-sm)
        DEFAULT: 'var(--radius)', // Added for clarity, maps to PRD default 'rounded-md'
        full: '9999px' // Added for PRD buttons: 'rounded-full'
			},
      fontFamily: {
        sans: ['Arial', 'sans-serif', ...defaultTheme.fontFamily.sans], // PRD: primaryFont is Arial, sans-serif
      },
      // PRD specifies 'shadow-sm' for default shadows. Tailwind's 'shadow-sm' is used directly.
      // No custom boxShadow definitions needed unless PRD specified custom shadow values.
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
