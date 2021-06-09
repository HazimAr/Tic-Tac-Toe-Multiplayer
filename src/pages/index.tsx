import { Box, Button, Center, Input } from "@chakra-ui/react";
import { Board } from "@components/board";
import { DB_URL } from "config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(DB_URL);

export default function Index(): JSX.Element {
	const [room, setRoom] = useState("");
	const [join, setJoin] = useState(false);
	useEffect(() => {
		if (join) socket.emit("join-room", room);
	}, [join]);
	return (
		<Center h="100vh">
			<Box>
				<Board socket={socket} room={room} />
				<Input
					onChange={(e) => {
						const room = e.target.value;
						setRoom(room);
						console.log(room);
					}}
					placeholder="Room"
				/>
				<Button
					onClick={() => {
						setJoin(true);
					}}
				>
					Join
				</Button>
			</Box>
		</Center>
	);
}
