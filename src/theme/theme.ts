import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'black !important',
        color: 'white',
        minHeight: '100vh',
      },
      '*': {
        borderColor: 'whiteAlpha.300',
      },
    }
  },
  colors: {
    primary: {
      main: 'red.500',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'red',
      },
      variants: {
        solid: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
          }
        }
      }
    }
  }
})

export default theme
