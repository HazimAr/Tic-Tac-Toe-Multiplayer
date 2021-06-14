import { Box, Button, Center, Heading, Input } from "@chakra-ui/react";
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
					}}
					placeholder="Room"
				/>
				<Box>
					<Button
						onClick={() => {
							router.push(`/play?room=${room}`);
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
					<Button
						onClick={() => {
							router.push("/settings");
						}}
					>
						Settings
					</Button>
				</Box>
			</Box>
		</Center>
	);
}
