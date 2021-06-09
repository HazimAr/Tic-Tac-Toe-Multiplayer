/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-negated-condition */
import { Button, Box, Grid, Center } from "@chakra-ui/react";
import { X, O } from "@components/playerHandler";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Cell = styled(Box)`
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

export default function Index(): JSX.Element {
	const [board, setBoard] = useState(Array.from({ length: 9 }).fill(null));
	const [turn, setTurn] = useState(true);
	const [winner, setWinner] = useState();

	function calculateWinner(board: any[]) {
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
		board.forEach((i) => {
			if (i === null) {
				nullCount += 1;
			}
		});
		if (nullCount === 0) {
			return "tie";
		}
	}

	function restart() {
		setBoard(Array.from({ length: 9 }).fill(null));
		setTurn(true);
		setWinner(undefined);
	}

	useEffect(() => {
		const winner = calculateWinner(board);
		if (winner !== undefined) {
			winner !== "tie" ? setWinner(winner) : setWinner(null);
		}
	}, [board]);
	return (
		<Center h="100vh">
			<Box>
				<Grid
					justifyContent="center"
					alignContent="center"
					templateColumns="repeat(3, auto)"
				>
					{board.map((yee, i) => {
						return (
							<Cell
								key={i}
								onClick={() => {
									if (board[i] !== null) {
										return;
									}
									if (winner !== undefined) {
										return;
									}
									const nBoard = Array.from({
										length: 9,
									}).fill(null);

									board.map((i, v) => {
										nBoard[v] = i;
									});

									nBoard[i] = turn;

									setBoard(nBoard);
									setTurn(!turn);
								}}
							>
								{yee !== null ? yee ? <O /> : <X /> : null}
							</Cell>
						);
					})}
				</Grid>
				{winner !== undefined
					? winner !== null
						? winner
							? "O has won"
							: "X has won"
						: "tie"
					: null}
				<Box>
					{winner !== undefined && winner !== null ? (
						<Button onClick={restart}>Restart</Button>
					) : null}
				</Box>
			</Box>
		</Center>
	);
}
