import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { Board } from "@components/board";
import { DB_URL, WEB } from "config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getParameterByName } from "@lib/cookie";
import { useRouter } from "next/router";
import { useClipboard } from "@chakra-ui/react";

const socket = io(DB_URL);

export default function Index(): JSX.Element {
	const router = useRouter();
	const [room, setRoom] = useState("");
	const [started, setStarted] = useState(false);
	const url = `${WEB}${router.asPath}`;

	const { hasCopied, onCopy } = useClipboard(url);

	useEffect(() => {
		const room = getParameterByName("room");
		if (room) {
			setRoom(room);
			socket.emit("join-room", room);
		}
		socket.on("start", () => {
			setStarted(true);
		});
	}, []);
	return (
		<Center h="100vh">
			<Box>
				{started ? (
					<Board socket={socket} room={room} />
				) : (
					<>
						<Heading>Send this link to a friend</Heading>

						<Heading size="md">{url}</Heading>
						<Button onClick={onCopy}>
							{hasCopied ? "Copied" : "Copy"}
						</Button>
					</>
				)}
			</Box>
		</Center>
	);
}
