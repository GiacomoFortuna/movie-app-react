
import { IconButton, Skeleton } from "@chakra-ui/react"
import { ClientOnly } from "./clientonly"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        variant="solid"
        backgroundColor="red.500"
        _hover={{ backgroundColor: "red.600" }}
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      />
    </ClientOnly>
  )
})

export const LightMode = React.forwardRef<HTMLSpanElement>(
  function LightMode(props, ref) {
    return (
      <Box
        as="span"
        color="white"
        bg="black"
        display="contents"
        className="chakra-theme light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLSpanElement>(
  function DarkMode(props, ref) {
    return (
      <Box
        as="span"
        color="white"
        bg="black"
        display="contents"
        className="chakra-theme dark"
        ref={ref}
        {...props}
      />
    )
  },
)
