import { Center, Select, Flex, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { X, O } from "@components/playerHandler";
import router from "next/router";
import { getCookie, setCookie } from "@lib/cookie";

const options = ["Red", "Blue"];

export default function Settings() {
	const [color, setColor] = useState("White");
	const [startingColor, setStartingColor] = useState("White");

	useEffect(() => {
		const cookie = getCookie("color");
		if (cookie) {
			setColor(cookie);
			setStartingColor(cookie);
		}
	}, []);

	useEffect(() => {
		setCookie("color", color, 30);
	}, [color]);

	return (
		<Center h="100vh" flexDir="column">
			<Button
				onClick={() => {
					router.push("/");
				}}
			>
				Back
			</Button>
			<Select
				placeholder={startingColor}
				maxW="200px"
				my="50px"
				onChange={(e) => {
					e.target.value
						? setColor(e.target.value)
						: setColor("White");
				}}
			>
				{options.map((color) => {
					return (
						<option value={color} key={color}>
							{color}
						</option>
					);
				})}
			</Select>
			<Flex w="200px">
				<X color={color} />
				<O color={color} />
			</Flex>
		</Center>
	);
}
