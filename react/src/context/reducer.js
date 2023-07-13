import { initialState } from "./GlobalContext.jsx";
import { HIDE_WELCOME, SETUP_GAME, SETUP_INITIAL_DEAL } from "./actions.js";

const Reducer = (state, action) => {

	// disables startup screen, enables main menu
	if (action.type === HIDE_WELCOME) {
		return {
			...state,
			showWelcome: false,
			showMenu: true
		}
	}

	// -user selected values from main menu are put into the global state
	// -shoe is loaded with number of decks chosen by user
	// -bankroll for both user and dealer and set into global state
	// -passes the menu screen to allow user to place a wager
	if (action.type === SETUP_GAME) {
		return {
			...state,
			showMenu: false,
			canPlaceBets: true,
			numDecks: action.payload.numDecks,
			shoe: action.payload.newShoe,
			player: {
				...state.player,
				bankroll: action.payload.playerBankroll
			},
			dealer: {
				...state.dealer,
				bankroll: action.payload.dealerBankroll
			}
		}
	}

	// -bet selected by user put into state, and bet option disabled
	// -cards are dealt to both player and dealer
	// -hands and scores are set in state
	// -shoe after the initial deal set in state
	// -cards should be rendered and user should be prompted an action based on hand value
	if (action.type === SETUP_INITIAL_DEAL) {
		return {
			...state,
			canPlaceBets: false,
			bet: action.payload.bet,
			shoe: action.payload.currentShoe,
			player: {
				...state.player,
				hand: action.payload.playerHand,
				score: action.payload.playerScore
			},
			dealer: {
				...state.dealer,
				hand: action.payload.dealerHand,
				score: action.payload.dealerScore
			}
		}
	}

	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;