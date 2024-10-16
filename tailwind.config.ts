import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
				common: {
					branco: '#FFF',
					preto: '#000'
				},
				'cinza-fumaca': {
					main: '#666',
					light: '#CCC',
					dark: '#333',
				},
				primary: {
					main: '#1976D2',
					light: '#42A5F5',
					dark: '#1565C0',
				},
				secondary: {
					main: '#B0279B',
					light: '#BA68C8',
					dark: '#7B1FA2',
				},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate],
};
export default config;
