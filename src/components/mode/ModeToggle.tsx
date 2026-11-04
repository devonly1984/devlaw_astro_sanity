
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const [theme, setThemeState] = useState<
    "theme-light" | "dark" | "system"
  >("theme-light")

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="translate-y-1 md:translate-y-0"
        asChild
      >
        <Button
          className=" h-8 hover:bg-primary focus:outline-none"
          variant="secondary"
          size="sm"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5" align="end">
        <DropdownMenuItem
          className="cursor-pointer focus:bg-primary"
          onClick={() => setThemeState("theme-light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setThemeState("dark")}
          className="cursor-pointer focus:bg-primary"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setThemeState("system")}
          className="cursor-pointer focus:bg-primary"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}