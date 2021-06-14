const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DB_URL = IS_PRODUCTION
	? "https://tic-calpico.herokuapp.com"
	: "http://localhost:3001";

const WEB = IS_PRODUCTION
	? "https://tic-tac-toe-online.vercel.app"
	: "http://localhost:3000";

type MetaType = {
	title: string;
	lang: string;
	description: string;
	url: string;
};

const META: MetaType = {
	title: "Online Tic-Tac-Toe Multiplayer | Hazim Arafa",
	lang: "en-us",
	description:
		"Play Tic-Tac-Toe in real time with your friends. Just invite them to your room using a link and boom you will have endless fun.",
	url: "",
};

export { IS_PRODUCTION, META, DB_URL, WEB };
