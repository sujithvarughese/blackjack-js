import { useGlobalContext } from "../context/GlobalContext.jsx";
import { createShoe } from "../deck.js";
import placeBets from "./PlaceBets.jsx";

const Simulation = () => {

	const { playerScore, dealerFaceUp, playerAce11, setupGame, placeBet, setInitialDeal } = useGlobalContext()

	const hit = "hit"
	const stay = "stay"
	const double = "double"

	let action

	const numDecks = 8
	const bankroll = 500
	const bet = 25


	const startSim = () => {
		const shoe = createShoe(numDecks)
		setupGame(shoe, bankroll)
		placeBet(bet)
	}

	if (playerAce11) {
		switch (playerScore) {
			case 18:
				switch (dealerFaceUp) {
					case 3:
					case 4:
					case 5:
					case 6:
						action = double
						break
					case 9:
					case 10:
					case 11:
						action = hit
						break
				}
			case 17:
				switch (dealerFaceUp) {
					case 3:
					case 4:
					case 5:
					case 6:
						action = double
						break
					case 2:
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
						action = hit
						break
				}
			case 16:
			case 15:
				switch (dealerFaceUp) {
					case 4:
					case 5:
					case 6:
						action = double
						break
					case 2:
					case 3:
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
						action = hit
						break
				}
			case 14:
			case 13:
				switch (dealerFaceUp) {
					case 5:
					case 6:
						action = double
						break
					case 2:
					case 3:
					case 4:
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
						action = hit
						break
				}
				break
			default:
				action = stay
		}
	}

	switch (playerScore) {
		case 20:
			action = hit
			break
		case 19:
			action = hit
		case 18:
			action = hit
			break
		case 16:
		case 15:
		case 14:
		case 13:
			switch (dealerFaceUp) {
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					action = hit
					break
			}
		case 12:
			switch (dealerFaceUp) {
				case 2:
				case 3:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					action = hit
					break
			}
		case 11:
			action = double
			break
		case 10:
			switch (dealerFaceUp) {
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					action = double
					break
				case 10:
				case 11:
					action = hit
					break
			}
		case 9:
			switch (dealerFaceUp) {
				case 3:
				case 4:
				case 5:
				case 6:
					action = double
					break
				case 2:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					action = hit
					break
			}
		case 8:
			switch (dealerFaceUp) {
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					action = hit
					break
			}
		case 7:
		case 6:
		case 5:
		case 4:
		case 3:
		case 2:
			switch (dealerFaceUp) {
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					action = hit
					break
			}
			break
		default:
			action = stay
	}

	const splitHands = () => {

	}

	return (
		<div>

		</div>
	);
};

export default Simulation;