import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.js";

const Welcome = () => {

	const { hideWelcome } = useGlobalContext()

	return (
		<div>
			Welcome to Blackjack!

			<button onClick={hideWelcome}>Start Game!</button>

		</div>
	);
};

export default Welcome;