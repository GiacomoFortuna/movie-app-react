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
        color: 'whiteAlpha.900',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden'
      },
      '#root': {
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'black !important',
      },
      'h1, h2, h3, h4, h5, h6': {
        color: 'white',
      },
      'p, span, div': {
        color: 'whiteAlpha.900',
      },
      'body > div#root': {
        minHeight: '100vh',
        backgroundColor: 'black',
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
