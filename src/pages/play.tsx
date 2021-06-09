import { Box, Button, Center, Input } from "@chakra-ui/react";
import { Board } from "@components/board";
import { DB_URL } from "config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getParameterByName } from "@lib/cookie";

const socket = io(DB_URL);

export default function Index(): JSX.Element {
	const [room, setRoom] = useState("");
	useEffect(() => {
		const room = getParameterByName("room");
		if (room) {
			setRoom(room);
			socket.emit("join-room", room);
		}
	}, []);
	return (
		<Center h="100vh">
			<Box>
				<Board socket={socket} room={room} />
			</Box>
		</Center>
	);
}
