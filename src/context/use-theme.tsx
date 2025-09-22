"use client"

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
} from "react";
import { useTheme as useNextTheme } from "next-themes";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useThemeHook = (): ThemeContextType => {
	const { theme, setTheme, systemTheme } = useNextTheme();

	// Determine if dark mode is active
	const isDarkMode = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

	const toggleTheme = useCallback(() => {
		setTheme(isDarkMode ? 'light' : 'dark');
	}, [isDarkMode, setTheme]);

	const setCurrentTheme = useCallback((darkMode: boolean) => {
		setTheme(darkMode ? 'dark' : 'light');
	}, [setTheme]);

	return { isDarkMode, toggleTheme, setCurrentTheme };
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const themeData = useThemeHook();
	return (
		<ThemeContext.Provider value={themeData}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

type ThemeContextType = {
	isDarkMode: boolean;
	toggleTheme: () => void;
	setCurrentTheme: (theme: boolean) => void;
};

type ThemeProviderProps = {
	children: ReactNode;
};