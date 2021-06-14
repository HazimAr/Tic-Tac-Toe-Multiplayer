import "@styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { META } from "config";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
				<script
					data-ad-client="ca-pub-8350269166887594"
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
				/>
			</Head>

			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}
