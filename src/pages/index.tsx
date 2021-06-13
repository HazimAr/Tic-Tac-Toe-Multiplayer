import { Box, Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import router from "next/router";
import { v4 as uuid } from "uuid";

export default function Index(): JSX.Element {
	const [room, setRoom] = useState("");

	return (
		<Center h="100vh">
			<Box>
				<Heading my="10px" size="lg">
					Welcome To Tic Tac Toe Multiplayer
				</Heading>
				<Input
					onChange={(e) => {
						const room = e.target.value;
						setRoom(room);
						console.log(room);
					}}
					placeholder="Room"
				/>
				<Flex justify="space-evenly">
					<Button
						onClick={() => {
							router.push(`/play?room=${room}`);
							console.log(`You joined room: ${room}`);
						}}
					>
						Join
					</Button>
					<Button
						onClick={() => {
							router.push(`/play?room=${uuid()}`);
						}}
					>
						Create Private Match
					</Button>
				</Flex>
			</Box>
		</Center>
	);
}
