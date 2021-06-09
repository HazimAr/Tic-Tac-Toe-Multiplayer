function O(props: { color: string }): JSX.Element {
	return (
		<svg
			version="1.1"
			viewBox="0.0 0.0 960.0 720.0"
			fill="none"
			stroke="none"
			strokeLinecap="square"
			strokeMiterlimit="10"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
		>
			<clipPath id="p.0">
				<path
					d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z"
					clipRule="nonzero"
				/>
			</clipPath>
			<g clipPath="url(#p.0)">
				<path
					fill="#000000"
					fillOpacity="0.0"
					d="m0 0l960.0 0l0 720.0l-960.0 0z"
					fillRule="evenodd"
				/>
				<path
					fill={props.color}
					d="m120.0 360.0l0 0c0 -198.82251 161.17749 -360.0 360.0 -360.0l0 0c95.47797 0 187.04535 37.928463 254.55847 105.44156c67.51306 67.51309 105.44153 159.0805 105.44153 254.55844l0 0c0 198.82251 -161.17749 360.0 -360.0 360.0l0 0c-198.82251 0 -360.0 -161.17749 -360.0 -360.0z"
					fillRule="evenodd"
				/>
			</g>
		</svg>
	);
}

function X(props: { color: string }): JSX.Element {
	return (
		<svg
			version="1.1"
			viewBox="0.0 0.0 960.0 720.0"
			fill="none"
			stroke="none"
			strokeLinecap="square"
			strokeMiterlimit="10"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlns="http://www.w3.org/2000/svg"
		>
			<clipPath id="p.0">
				<path
					d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z"
					clipRule="nonzero"
				/>
			</clipPath>
			<g clipPath="url(#p.0)">
				<path
					fill="#000000"
					fillOpacity="0.0"
					d="m0 0l960.0 0l0 720.0l-960.0 0z"
					fillRule="evenodd"
				/>
				<path
					fill={props.color}
					d="m188.50038 40.312477l0 0c3.8907166 -3.8907127 10.198807 -3.8907127 14.089523 0l597.09155 597.09155c1.8684082 1.8684082 2.9180908 4.402466 2.9180908 7.044739c0 2.642334 -1.0496826 5.1763916 -2.9180908 7.0448l-28.178162 28.178162c-3.890747 3.890747 -10.1987915 3.890747 -14.089539 0l-597.09155 -597.09155c-3.8907166 -3.8907166 -3.8907166 -10.198807 0 -14.089523z"
					fillRule="evenodd"
				/>
				<path
					fill={props.color}
					d="m799.6795 68.507034l0 0c3.890747 3.8907166 3.890747 10.198807 0 14.089523l-597.09155 597.09155c-1.868393 1.8684082 -4.402466 2.9180908 -7.0447693 2.9180908c-2.6422882 0 -5.176361 -1.0496826 -7.044754 -2.9180908l-28.178192 -28.178162c-3.8907166 -3.890747 -3.8907166 -10.1987915 0 -14.089539l597.09155 -597.09155c3.890747 -3.8907127 10.1987915 -3.8907127 14.089539 0z"
					fillRule="evenodd"
				/>
			</g>
		</svg>
	);
}

export { O, X };
