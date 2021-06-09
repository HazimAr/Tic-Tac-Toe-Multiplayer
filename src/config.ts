const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DB_URL = "https://tic-calpico.herokuapp.com";
// const DB_URL = "https://f8513c61268b.ngrok.io";


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

export { IS_PRODUCTION, META, DB_URL };
