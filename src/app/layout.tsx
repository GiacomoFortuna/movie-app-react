import './globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from '../theme/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="black">
        {children}
      </Box>
    </ChakraProvider>
  )
}
