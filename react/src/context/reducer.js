
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	HIDE_WELCOME,
	SETUP_GAME,
	PLACE_BETS,
	SET_INITIAL_DEAL,

	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,

	PLAYER_BUST,
	PLAYER_SAFE,
	PLAYER_DOUBLE,
	PLAYER_STAY,
	PLAYER_SPLIT,
	DEALER_BUST,
	DEALER_HIT
	DEALER_SAFE,
	PLAYER_WIN,
	DEALER_WIN,
	PUSH,
	CLEAR_HANDS

} from "./actions.js";

const Reducer = (state, action) => {

	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			alert: action.payload.alertText,
			showAlert: true
		}
	}

	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alert: ''
		}
	}
	// disables startup screen, enables main menu
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
			shoe: action.payload.shoe,
			playerBankroll: action.payload.playerBankroll,
			canPlaceBets: true,
			showMenu: false
		}
	}

	if (action.type === PLACE_BETS) {
		return {
			...state,
			canPlaceBets: false,
			handInProgress: true
		}
	}

	// -user selected values from main menu are put into the global state
	// -shoe is loaded with number of decks chosen by user
	// -bankroll for user set into global state
	// -passes the menu screen to allow user to place a wager
	// -cards are dealt to both player and dealer
	// -hands and scores are set in state
	// -shoe after the initial deal set in state
	// -cards should be rendered and user should be prompted an action based on hand value
	if (action.type === SET_INITIAL_DEAL) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerCardShown: false,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			splitOption: action.payload.splitOption,
			showMenu: false,
			handInProgress: true,
			playerOptions: true,
			doubleOption: true,
			hitOption: true
		}
	}

	if (action.type === HANDLE_BOTH_BLACKJACK) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerCardShown: true,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			placeBets: true,
			playerOptions: true,
			// return bet to player
			playerBankroll: state.playerBankroll + state.bet
		}
	}
	if (action.type === HANDLE_PLAYER_BLACKJACK) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerCardShown: true,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			placeBets: true,
			playerOptions: true,
			// blackjack pays 2:1
			playerBankroll: state.playerBankroll + (state.bet * 1.5) + state.bet
		}
	}

	if (action.type === HANDLE_DEALER_BLACKJACK) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerCardShown: true,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			placeBets: true,
			playerOptions: true,
		}
	}



	if (action.type === PLAYER_BUST) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			playerScore: action.payload.playerScore,
			canPlaceBets: true,
			dealerCardShown: true
		}
	}

	if (action.type === PLAYER_SAFE) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			playerScore: action.payload.playerScore,

		}
	}

	if (action.type === PLAYER_STAY) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			dealerCardShown: true
		}
	}

	if (action.type === PLAYER_DOUBLE) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			doubledHand: true
		}
	}

	if (action.type === DEALER_BUST) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerHand: action.payload.dealerHand,
			playerBankroll: state.playerBankroll + state.bet + state.bet,
			canPlaceBets: true,
			playerOptions: true,
		}
	}



	if (action.type === DEALER_SAFE) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerHand: action.payload.dealerHand,
			dealerScore: action.payload.dealerScore,

		}
	}
	if (action.type === DEALER_HIT) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerHand: action.payload.dealerHand,
			dealerScore: action.payload.dealerScore,
		}
	}

	if (action.type === PLAYER_WIN) {
		return {
			...state,
			playerBankroll: state.playerBankroll + state.bet + state.bet,
			canPlaceBets: true,
			playerOptions: true,
		}
	}
	if (action.type === DEALER_WIN) {
		return {
			...state,
			canPlaceBets: true,
			playerOptions: true,
		}
	}
	if (action.type === PUSH) {
		return {
			...state,
			playerBankroll: state.playerBankroll + state.bet,
			canPlaceBets: true,
			playerOptions: true,
		}
	}

	if (action.type === CLEAR_HANDS) {
		return {
			...state,
		}
	}



	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;