import { initialState } from "./GlobalContext.js";
import { HIDE_WELCOME, SETUP_GAME } from "./actions.js";

const Reducer = (state, action) => {

	if (action.type === HIDE_WELCOME) {
		return {
			...state,
			showWelcome: false,
			showMenu: true
		}
	}

	if (action.type === SETUP_GAME) {
		return {
			...state,
			showMenu: false,
			showDealButton: true,
			numDecks: action.payload.numDecks,
			shoe: action.payload.newShoe,
			player: {
				...player,
				bankroll: action.payload.playerBankroll
			},
			dealer: {
				...dealer,
				bankroll: action.payload.dealerBankroll
			}
		}
	}

	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;