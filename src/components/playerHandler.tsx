import Image from "next/image";

function O(): JSX.Element {
	return <Image src="/players/o.svg" width="200px" height="200px" />;
}

function X(): JSX.Element {
	return <Image src="/players/x.svg" width="200px" height="200px" />;
}

export { O, X };
