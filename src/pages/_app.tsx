import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/theme";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  return <ChakraProvider theme={theme} resetCSS>
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route}/>
    </AnimatePresence>
  </ChakraProvider>
}

export default MyApp
