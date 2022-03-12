import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FCECD2",
      300: "#EDE0D7",
      400: "#D3B19B",
      500: "#A76336"
    },
  },
  shadows: {
    card: "0px 4px 120px rgba(167, 99, 54, 0.07), 0px 1.7545px 50.1331px rgba(167, 99, 54, 0.0527398), 0px 1.10278px 26.8036px rgba(167, 99, 54, 0.0477353), 0px 0.743693px 15.0259px rgba(167, 99, 54, 0.0433487), 0px 0.472847px 7.98012px rgba(167, 99, 54, 0.0366719), 0px 0.232269px 3.32071px rgba(167, 99, 54, 0.0246041);",
  },
  styles: {
    global: {
      'html, body': {
        color: 'brand.500',
        height: '100%',
        overflow: 'hidden'
      },
      '#__next': {
        height: '100%'
      }
    },
  },
})

