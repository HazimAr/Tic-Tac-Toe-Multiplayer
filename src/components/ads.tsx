import AdSense from "react-adsense";
import { Flex } from "@chakra-ui/react";

export default function Ads({ children }: any) {
	return (
		<Flex justify="center" align="center">
			<AdSense.Google
				client="4286944118-pub-8350269166887594"
				slot="7806394673"
				style={{ display: "block" }}
				format="auto"
				responsive="true"
			/>
			{children}
			<AdSense.Google
				client="4286944118-pub-8350269166887594"
				slot="7806394673"
				style={{ display: "block" }}
				format="auto"
				responsive="true"
			/>
		</Flex>
	);
}
