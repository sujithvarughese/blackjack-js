import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	HIDE_WELCOME,
	SETUP_GAME,
	SET_SHOW_MENU,
	ADD_FUNDS,
	PLACE_BETS,
	DEAL_CARD,
	SPLIT_HAND,
	SET_INITIAL_DEAL,
	SHOW_ASSIST,

	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,

	PLAYER_BUST,
	PLAYER_SAFE,
	PLAYER_DOUBLE,
	PLAYER_STAY,
	DEALER_BUST,
	DEALER_SAFE,
	PLAYER_WIN,
	DEALER_WIN,
	PUSH,


} from "./actions.js";

const Reducer = (state, action) => {

	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			alertText: action.payload.alertText,
			showAlert: true
		}
	}

	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertText: ''
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

	if (action.type === SET_SHOW_MENU) {
		return {
			...state,
			showMenu: action.payload.mainMenu,
			canPlaceBets: false,
			handInProgress: false
		}
	}

	// bankroll and shoe set into global state
	if (action.type === SETUP_GAME) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerBankroll: action.payload.playerBankroll,
			canPlaceBets: true,
			showMenu: false
		}
	}

	if (action.type === ADD_FUNDS) {
		return {
			...state,
			playerBankroll: Number(state.playerBankroll) + Number(action.payload.reloadAmount)
		}
	}

	// remove bet amount from bankroll and set bet and bankroll in state
	if (action.type === PLACE_BETS) {
		return {
			...state,
			showAlert: false,
			alertText: "",
			bet: action.payload.bet,
			playerBankroll: state.playerBankroll - action.payload.bet,
			doubledHand: false,
			canPlaceBets: false,
			dealerCardShown: false,
			playerAce11: false,
			dealerAce11: false,
			handInProgress: true
		}
	}

	if (action.type === DEAL_CARD) {
		return {
			...state,
			shoe: action.payload.shoe
		}
	}

	if (action.type ===  SPLIT_HAND) {
		return {
			...state,
			splitHand: action.payload.splitHand,
			playerHand: action.payload.playerHand,
			playerHandSplit: action.payload.playerHandSplit,
			playerAce11: action.payload.playerAce11,
			splitOption: false,
		}
	}

	// -hands and scores are set in state
	// -shoe after deal set in state
	// -cards should be rendered and user should be prompted an action based on hand value
	if (action.type === SET_INITIAL_DEAL) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			playerAce11: action.payload.playerAce11,
			dealerAce11: action.payload.dealerAce11,
			dealerFaceUp: action.payload.dealerFaceUp,
			doubleOption: true,
			splitOption: action.payload.splitOption,
			hitOption: true,
			playerOptions: true
		}
	}


	if (action.type === SHOW_ASSIST) {
		return {
			...state,
			showAssist: action.payload.bool,
		}
	}

	// handle blackjack, then allow user to place bet for new hand
	if (action.type === HANDLE_BOTH_BLACKJACK) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerCardShown: true,
			playerHand: action.payload.playerHand,
			dealerHand: action.payload.dealerHand,
			playerScore: action.payload.playerScore,
			dealerScore: action.payload.dealerScore,
			canPlaceBets: true,
			playerOptions: false,
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
			canPlaceBets: true,
			playerOptions: false,
			// blackjack pays 3:2
			playerBankroll: state.playerBankroll + state.bet + (state.bet * 1.5)
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
			canPlaceBets: true,
			playerOptions: false,
		}
	}

	if (action.type === PLAYER_BUST) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			playerScore: action.payload.playerScore,
			playerBankroll: action.payload.playerBankroll,
			bet: action.payload.bet,
			doubledHand: action.payload.doubledHand,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			canPlaceBets: true,
			dealerCardShown: true,
			showAssist: false,
		}
	}

	if (action.type === PLAYER_SAFE) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			playerScore: action.payload.playerScore,
			playerAce11: action.payload.playerAce11,
			splitOption: false,
			doubleOption: false,
			showAssist: false,
		}
	}

	if (action.type === PLAYER_STAY) {
		return {
			...state,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			dealerCardShown: true,
			showAssist: false,
		}
	}

	if (action.type === PLAYER_DOUBLE) {
		return {
			...state,
			shoe: action.payload.shoe,
			playerHand: action.payload.playerHand,
			playerScore: action.payload.playerScore,
			playerBankroll: action.payload.playerBankroll,
			bet: action.payload.bet,
			playerOptions: false,
			splitOption: false,
			doubleOption: false,
			hitOption: false,
			doubledHand: true,
			dealerCardShown: true,
			showAssist: false,
		}
	}

	if (action.type === DEALER_BUST) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerHand: action.payload.dealerHand,
			dealerScore: action.payload.dealerScore,
			playerBankroll: state.playerBankroll + state.bet + state.bet,
			canPlaceBets: true,
		}
	}

	if (action.type === DEALER_SAFE) {
		return {
			...state,
			shoe: action.payload.shoe,
			dealerHand: action.payload.dealerHand,
			dealerScore: action.payload.dealerScore,
			dealerAce11: action.payload.dealerAce11
		}
	}

	if (action.type === PLAYER_WIN) {
		return {
			...state,
			playerBankroll: state.playerBankroll + state.bet + state.bet,
			canPlaceBets: true,
		}
	}
	if (action.type === DEALER_WIN) {
		return {
			...state,
			canPlaceBets: true,
		}
	}
	if (action.type === PUSH) {
		return {
			...state,
			playerBankroll: state.playerBankroll + state.bet,
			canPlaceBets: true,
		}
	}

	throw new Error(`No such action: ${action.type}`)
};

export default Reducer;