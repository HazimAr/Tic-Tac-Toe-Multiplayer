const IS_PRODUCTION = process.env.NODE_ENV === "production";

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
	url: "https://boilerplate.hazimarafa.tech",
};

export { IS_PRODUCTION, META };
