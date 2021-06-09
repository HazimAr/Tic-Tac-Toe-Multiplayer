/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-default-export */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-negated-condition */
import { Box, Grid, Center, Button } from "@chakra-ui/react";
import { X, O } from "@components/playerHandler";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DB_URL } from "config";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

let Cell = styled(Center)`
	border: 5px solid black;
	height: 200px;
	width: 200px;

	// Top
	:nth-child(1),
	:nth-child(2),
	:nth-child(3) {
		border-top: none;
	}

	//Right
	:nth-child(3n + 3) {
		border-right: none;
	}

	//Bottom
	:nth-child(7),
	:nth-child(8),
	:nth-child(9) {
		border-bottom: none;
	}

	//Left
	:nth-child(3n + 1) {
		border-left: none;
	}
`;

// @ts-ignore
Cell = motion(Cell);

export function Board({ socket, room }: any): JSX.Element {
	const [board, setBoard]: any = useState(
		Array.from({ length: 9 }).fill(null)
	);
	const [turn, setTurn] = useState(true);
	const [winner, setWinner] = useState();
	const [hover, setHover] = useState([false, -1]);
	const [fromUser, setFromUser] = useState(false);

	function calculateWinner(board: boolean[]) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (const i of lines) {
			const [a, b, c] = i;
			if (board[a] === true && board[b] === true && board[c] === true) {
				return true;
			}
			if (
				board[a] === false &&
				board[b] === false &&
				board[c] === false
			) {
				return false;
			}
		}

		let nullCount = 0;
		board.forEach((i: boolean) => {
			if (i === null) {
				nullCount += 1;
			}
		});
		if (nullCount === 0) {
			return "tie";
		}
	}

	function isValidMove(i: number) {
		if (board[i] !== null) {
			return false;
		}
		if (winner !== undefined) {
			return false;
		}
		return true;
	}

	function restart(emit = true) {
		emit ? socket.emit("restart", room) : null;

		const nBoard = Array.from({
			length: 9,
		}).fill(null);

		setBoard(nBoard);
		setTurn(true);

		// eslint-disable-next-line unicorn/no-useless-undefined
		setWinner(undefined);
	}

	useEffect(() => {
		if (fromUser) {
			socket.emit("turn", board, turn, room);
		}
		const winner = calculateWinner(board);
		if (winner !== undefined) {
			// @ts-ignore
			winner !== "tie" ? setWinner(winner) : setWinner(null);
		}
	}, [board]);

	useEffect(() => {
		socket.on("turn", (board: boolean[], turn: boolean) => {
			setFromUser(false);
			setTurn(turn);
			setBoard(board);
		});
		socket.on("restart", () => {
			restart(false);
		});
	}, []);

	return (
		<Box>
			<Grid
				justifyContent="center"
				alignContent="center"
				templateColumns="repeat(3, auto)"
			>
				{board.map((yee: boolean, i: number) => {
					return (
						<Cell
							key={i}
							onClick={() => {
								if (isValidMove(i)) {
									setHover([false, i]);
									const nBoard = Array.from({
										length: 9,
									}).fill(null);

									board.map((i: number, v: number) => {
										nBoard[v] = i;
									});

									nBoard[i] = turn;

									setFromUser(true);
									setTurn(!turn);
									setBoard(nBoard);
								}
							}}
							onHoverStart={() => {
								if (isValidMove(i)) {
									if (hover[1] === i) {
										return;
									}
									setHover([true, i]);
								}
							}}
							onHoverEnd={() => {
								if (isValidMove(i)) {
									setHover([false, 0]);
								}
							}}
						>
							{yee !== null ? (
								yee ? (
									<O color="white" />
								) : (
									<X color="white" />
								)
							) : null}
							{hover[1] === i && hover[0] ? (
								turn ? (
									<O color="#484d56" />
								) : (
									<X color="#484d56" />
								)
							) : null}
						</Cell>
					);
				})}
			</Grid>
			<Box>
				{winner !== undefined
					? winner !== null
						? winner
							? "O has won"
							: "X has won"
						: "tie"
					: null}
				<Box>
					{winner !== undefined ? (
						<Button variant="outline" onClick={restart}>
							Restart
						</Button>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}
