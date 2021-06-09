import "@styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@components/footer";
import Header from "@components/header";
import { META } from "config";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
			<Footer />
		</>
	);
}
