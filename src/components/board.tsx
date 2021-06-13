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
// import router from "next/router";

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

export function Board({ socket, serverTurn, room }: any): JSX.Element {
	const [board, setBoard]: any = useState(
		Array.from({ length: 9 }).fill(null)
	);
	const [turn, setTurn] = useState(0);
	const [userTurn] = useState(serverTurn);
	const [fromUser, setFromUser] = useState(false);
	const [winner, setWinner] = useState(null);
	const [hover, setHover] = useState(-1);
	// const [doneLoading, setDoneLoading] = useState(false);

	function calculateWinner(board: number[]) {
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
			if (board[a] === 1 && board[b] === 1 && board[c] === 1) {
				return 1;
			}
			if (board[a] === 0 && board[b] === 0 && board[c] === 0) {
				return 0;
			}
		}

		let nullCount = 0;
		board.forEach((i: number) => {
			if (i === null) {
				nullCount += 1;
			}
		});
		if (nullCount === 0) {
			return 3;
		}
		return null;
	}

	function isValidMove(i: number) {
		if (turn === userTurn) {
			if (board[i] !== null) {
				return false;
			}
			if (winner !== null) {
				return false;
			}
			return true;
		}
		return false;
	}

	function restart(emit = true) {
		emit ? socket.emit("restart", room) : null;
		setBoard(
			Array.from({
				length: 9,
			}).fill(null)
		);
		setTurn(1);
		setWinner(null);
	}

	useEffect(() => {
		if (fromUser) {
			socket.emit("turn", board, turn, room);
		}
		//@ts-ignore
		setWinner(calculateWinner(board));
	}, [board]);

	useEffect(() => {
		if (turn === userTurn) {
			socket.emit("hover", hover, room);
		}
	}, [hover]);

	useEffect(() => {
		socket.on("turn", (board: number[], turn: number) => {
			setFromUser(false);
			setBoard(board);
			setTurn(turn);
		});

		socket.on("restart", () => {
			restart(false);
		});
		socket.on("hover", (hover: number) => {
			// console.log(hover);
			// console.log(`Turn: ${turn} userTurn: ${userTurn}`);

			if (turn !== userTurn) {
				// console.log("hover works");
				setHover(hover);
			}
		});
	}, []);

	useEffect(() => {
		// if (turn !== undefined && userTurn !== undefined && !doneLoading) {
		// 	setDoneLoading(true);
		// }
		socket.removeListener("hover");
			socket.on("hover", (hover: number) => {
			// console.log(hover);
			// console.log(`Turn: ${turn} userTurn: ${userTurn}`);

			if (turn !== userTurn) {
				// console.log("hover works");
				setHover(hover);
			}
		});
		
		setHover(-1);
		console.log(`Turn: ${turn} userTurn: ${userTurn}`);
	}, [turn, userTurn]);

	// useEffect(() => {
	// 	if (doneLoading) {
	// 		socket.on("hover", (hover: number) => {
	// 			console.log(hover);
	// 			console.log(`Turn: ${turn} userTurn: ${userTurn}`);

	// 			if (turn !== userTurn) {
	// 				console.log("hover works");
	// 				setHover(hover);
	// 			}
	// 		});
	// 	}
	// }, [doneLoading]);

	return (
		<Box>
			<Grid
				justifyContent="center"
				alignContent="center"
				templateColumns="repeat(3, auto)"
			>
				{board.map((cell: boolean, i: number) => {
					return (
						<Cell
							key={i}
							onClick={() => {
								if (isValidMove(i)) {
									setHover(-1);

									const tempBoard = Array.from({
										length: 9,
									}).fill(null);

									board.map((i: number, v: number) => {
										tempBoard[v] = i;
									});

									tempBoard[i] = turn;

									setFromUser(true);
									setBoard(tempBoard);
									setTurn(turn ? 0 : 1);
								}
							}}
							onHoverStart={() => {
								if (isValidMove(i)) {
									if (hover === i) {
										return;
									}
									setHover(i);
								}
							}}
							onHoverEnd={() => {
								if (isValidMove(i)) {
									setHover(-1);
								}
							}}
						>
							{cell !== null ? (
								cell ? (
									<X color="white" />
								) : (
									<O color="white" />
								)
							) : null}
							{hover === i ? (
								turn ? (
									<X color="#484d56" />
								) : (
									<O color="#484d56" />
								)
							) : null}
						</Cell>
					);
				})}
			</Grid>
			<Box>
				{winner !== null
					? winner !== 3
						? winner
							? "X has won the game"
							: "O has won the game"
						: "You tied"
					: turn === userTurn
					? "Your Turn"
					: "Opponent's Turn"}
				<Box>
					{winner !== null ? (
						//@ts-ignore
						<Button variant="outline" onClick={restart}>
							Restart
						</Button>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}
