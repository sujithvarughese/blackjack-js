import { initialState } from "./GlobalContext.jsx";
import {
	CLEAR_ALERT,
	HIDE_WELCOME,
	SETUP_GAME,
	INITIAL_DEAL_BEGIN,
	INITIAL_DEAL_SUCCESS,
	CHECK_BLACKJACK_BEGIN,
	SET_PLAYER_BLACKJACK,
	SET_DEALER_BLACKJACK,
	CHECK_BLACKJACK_SUCCESS,
	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,
	DISPLAY_OPTIONS_ALL,
	DISPLAY_OPTIONS_DOUBLE,
	DISPLAY_OPTIONS_NORMAL,
	PLAYER_BUST,
	PLAYER_HIT,
	PLAYER_DOUBLE,
	PLAYER_STAY,
	DEALER_BUST,
	DEALER_HIT,
	PLAYER_SPLIT,
	NEW_DEAL,

} from "./actions.js";

const Reducer = (state, action) => {


	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			isLoading: false,
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

	// -user selected values from main menu are put into the global state
	// -shoe is loaded with number of decks chosen by user
	// -bankroll for user set into global state
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
		}
	}

	// -bet selected by user put into state, and bet option disabled
	if (action.type === INITIAL_DEAL_BEGIN) {
		return {
			...state,
			canPlaceBets: false,
			bet: action.payload.bet,
			handInProgress: true,
			player: {
				bankroll: state.player.bankroll - state.bet
			}
		}
	}

	// -cards are dealt to both player and dealer
	// -hands and scores are set in state
	// -shoe after the initial deal set in state
	// -cards should be rendered and user should be prompted an action based on hand value
	if (action.type === INITIAL_DEAL_SUCCESS) {
		return {
			...state,
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
	// -after initial deal, check both player and dealer for blackjack
	// -if blackjack, show appropriate alert and square up bankroll
	// -user will have to click the alert to proceed to new hand
	if (action.type === CHECK_BLACKJACK_BEGIN) {
		return {
			...state,
			isLoading: true,
			alert: 'Checking for blackjack...',
			showAlert: true
		}
	}

	if (action.type === SET_PLAYER_BLACKJACK) {
		return {
			...state,
			isLoading: false,
			alert: 'Congratulations! You have blackjack!',
			player: {
				...state.player,
				hasBlackjack: true,
			},
		}
	}

	if (action.type === SET_DEALER_BLACKJACK) {
		return {
			...state,
			isLoading: false,
			alert: 'Dealer has blackjack!',
			dealer: {
				...state.dealer,
				hasBlackjack: true
			}
		}
	}

	if (action.type === CHECK_BLACKJACK_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: false,
			alert: ''
		}
	}

	if (action.type === HANDLE_BOTH_BLACKJACK) {
		return {
			...state,
			alert: 'Player and dealer blackjack! Push!',
			showAlert: true,
			handInProgress: false,
			newDealOption: true,
			playerOptions: true,
		}
	}

	if (action.type === HANDLE_PLAYER_BLACKJACK) {
		return {
			...state,
			alert: 'Congratulations! You have blackjack!',
			showAlert: true,
			handInProgress: false,
			newDealOption: true,
			playerOptions: true,
		}
	}
	if (action.type === HANDLE_DEALER_BLACKJACK) {
		return {
			...state,
			alert: 'Dealer has blackjack!',
			showAlert: true,
			newDealOption: true,
			playerOptions: true,
		}
	}

	if (action.type === DISPLAY_OPTIONS_ALL) {
		return {
			...state,
			playerOptions: true,
			splitOption: true,
			doubleOption: true,
			hitOption: true
		}
	}

	if (action.type === DISPLAY_OPTIONS_DOUBLE) {
		return {
			...state,
			playerOptions: true,
			splitOption: false,
			doubleOption: true,
			hitOption: true
		}
	}
	if (action.type === DISPLAY_OPTIONS_NORMAL) {
		return {
			...state,
			playerOptions: true,
			splitOption: false,
			doubleOption: false,
			hitOption: true
		}
	}

	if (action.type === PLAYER_BUST) {
		return {
			...state,
			playerOptions: true,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			player: {
				...state.player,
				hand: action.payload.playerHand,
				score: action.payload.playerScore,
			},
			alert: 'Player Bust! Try again!',
			showAlert: true,
			newDealOption: true,
			canPlaceBets: true
		}
	}
	if (action.type === PLAYER_HIT) {
		return {
			...state,
			playerOptions: true,
			splitOption: false,
			doubleOption: false,
			hitOption: true,
			shoe: action.payload.currentShoe,
			player: {
				...state.player,
				hand: action.payload.playerHand,
				score: action.payload.playerScore
			},
			alert: 'Hit or Stay!',
			showAlert: true
		}
	}

	if (action.type === PLAYER_STAY) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			alert: '',
			showAlert: false
		}
	}

	if (action.type === PLAYER_DOUBLE) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			alert: 'Double Down!',
			showAlert: true,
			doubledHand: true
		}
	}

	if (action.type === DEALER_BUST) {

	}

	if (action.type === DEALER_HIT) {

	}



	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;