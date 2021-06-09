import { Box, Button, Center } from "@chakra-ui/react";
import router from "next/router";

export default function Left() {
	return (
		<Center h="100vh">
			<Box>
			    Your opponent has left!
				<br />
				<Button
					onClick={() => {
						router.push("/");
					}}
				>
					Home
				</Button>
			</Box>
		</Center>
	);
}
