import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || (prefersDark ? "dark" : "light")    
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        
        localStorage.setItem("theme", theme);
    }, [theme]);

    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);