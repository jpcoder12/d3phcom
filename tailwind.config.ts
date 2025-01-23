import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			text: {
  				primary: 'rgba(180, 210, 255, 0.85)',
  				secondary: 'rgba(150, 190, 235, 0.8)',
  				muted: 'rgba(130, 170, 210, 0.7)',
  				highlight: 'rgba(130, 230, 255, 0.9)',
  				accent: 'rgba(200, 230, 255, 0.95)',
  				offWhite1: 'rgba(240, 240, 245, 0.9)',
  				offWhite2: 'rgba(235, 235, 240, 0.9)',
  				offWhite3: 'rgba(250, 250, 255, 0.95)',
  				offWhite4: 'rgba(245, 245, 250, 0.7)',
  				offWhite5: 'rgba(242, 243, 248, 0.9)'
  			},
  			card: {
  				DEFAULT: 'rgba(30, 30, 30, 0.1)',
  				foreground: 'rgba(255, 255, 255, 0.85)',
  				border: '#34346278'
  			},
  			glow: {
  				border: 'rgba(80, 80, 80, 0.4)',
  				light: 'rgba(100, 200, 255, 0.6)'
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
  		boxShadow: {
  			'glow-md': '0px 4px 10px rgba(80, 80, 80, 0.6)',
  			'glow-lg': '0px 6px 15px rgba(100, 200, 255, 0.3)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
