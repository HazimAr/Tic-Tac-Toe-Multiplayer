import { Box, Button, Text, Center, Heading } from "@chakra-ui/react";
import { Board } from "@components/board";
import { DB_URL } from "config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getParameterByName } from "@lib/cookie";
import { useRouter } from "next/router";
import { useClipboard } from "@chakra-ui/react";
import useInterval from "@hooks/useInterval";

const socket = io(DB_URL);

export default function Index(): JSX.Element {
  const router = useRouter();
  const [url, setUrl] = useState("loading...");
  const [room, setRoom] = useState("");
  const [started, setStarted] = useState(false);
  const [serverTurn, setServerTurn] = useState(0);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `https://${host}`;

    setUrl(`${baseUrl}/${router.pathname}`);
  }, [router.pathname]);

  const { hasCopied, onCopy } = useClipboard(url);

  useInterval(() => {
    const start = Date.now();

    // volatile, so the packet will be discarded if the socket is not connected
    socket.volatile.emit("ping", () => {
      setPing(Date.now() - start);
    });
  }, 750);

  useEffect(() => {
    socket.on("start", () => {
      setStarted(true);
    });

    socket.on("leave", () => {
      setStarted(false);
      socket.emit(
        "join-room",
        room,
        (isStarted: boolean, serverTurn: number) => {
          setServerTurn(serverTurn);
          setStarted(isStarted);
        }
      );
    });

    const room = getParameterByName("room");

    if (room) {
      setRoom(room);
      socket.emit(
        "join-room",
        room,
        (isStarted: boolean, serverTurn: number) => {
          setServerTurn(serverTurn);
          setStarted(isStarted);
        }
      );
    }
  }, []);

  return (
    <Center h="100vh">
      <Box>
        {started ? (
          <Box>
            <Board socket={socket} serverTurn={serverTurn} room={room} />
          </Box>
        ) : (
          <Box>
            <Heading>Send this link to a friend</Heading>

            <Heading size="md">{url}</Heading>
            <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
          </Box>
        )}
        <Box>
          <Text>Ping: {ping}ms</Text>
        </Box>
      </Box>
    </Center>
  );
}
