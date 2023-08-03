import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	HIDE_WELCOME,

	SETUP_GAME,
	ADD_FUNDS,
	PLACE_BETS,
	SET_INITIAL_DEAL,

	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,

	PLAYER_BUST,
	PLAYER_SAFE,
	PLAYER_STAY,
	PLAYER_DOUBLE,
	DEALER_BUST,
	DEALER_SAFE,
	PLAYER_WIN,
	DEALER_WIN,
	PUSH,
} from './actions.js'

const initialState = {
	alert: '',
	showAlert: false,

	shoe: {},
	playerBankroll: 500,
	bet: 25,

	playerHand: [],
	playerScore: 0,
	playerBlackjack: false,
	playerAce11: false,

	dealerHand: [],
	dealerScore: 0,
	dealerBlackjack: false,
	dealerAce11: false,

	isLoading: false,

	showWelcome: true,
	showMenu: false,
	showAddFunds: false,
	canPlaceBets: false,

	handInProgress: false,
	dealerCardShown: false,

	playerOptions: false,
	insuranceOption: false,
	splitOption: false,
	doubleOption: false,
	hitOption: false,
	newDealOption: false,

	doubledHand: false,
	splitHand: false,
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {


	const [state, dispatch] = useReducer(reducer, initialState)

	const displayAlert = (alertText) => {
		dispatch({
			type: DISPLAY_ALERT,
			payload: { alertText }
		})
		//clearAlert()
	}

	const clearAlert = (ms) => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, ms)
	}

	// hide startup screen -> take user to main menu
	const hideWelcome = () => {
		dispatch({ type: HIDE_WELCOME })
	}

	// set shoe and bankroll to global state
	const setupGame = (shoe, playerBankroll) => {
		dispatch({
			type: SETUP_GAME,
			payload: { shoe, playerBankroll}

		})
	}

	const addFunds = (reloadAmount) => {
		dispatch({
			type: ADD_FUNDS,
			payload: { reloadAmount }
		})
	}

	// user places initial bet, set to state, then cards are dealt
	const placeBet = (bet) => {
		dispatch({
			type: PLACE_BETS,
			payload: { bet }
		})
		setInitialDeal()
	}

	const setInitialDeal = () => {
		const shoe = [...state.shoe]
		console.log(shoe);
		const playerHand = []  // temp hands for player and dealer that we put in state after deal
		const dealerHand = []
		let playerAce11 = false // number of aces in hand worth 11 (which still can be reduced to 1)
		let dealerAce11 = false
		// deal cards, if Ace is dealt, change value from 1 to 11
		let nextCard = shoe.pop()
		if (nextCard.value === 1) {
			playerAce11 = true
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		let playerScore = nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
			dealerAce11= true
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		let dealerScore = nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
			playerAce11 = true
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		playerScore += nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
			dealerAce11= true
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		dealerScore += nextCard.value

		// check for blackjacks
		let playerBlackjack = false
		let dealerBlackjack = false
		if (playerScore === 21) {
			playerBlackjack = true
		}
		if (dealerScore === 21) {
			dealerBlackjack = true
		}

		// if blackjack is found, send values to handleBlackjack function to end hand and set values in global state
		if (playerBlackjack || dealerBlackjack) {
			setTimeout(() => {
				return handleBlackjack(playerBlackjack, dealerBlackjack, playerHand, dealerHand, shoe)
			}, 1000)
		}
		// if no blackjacks, set values to global state, then prompt user options
		let splitOption = false
		// if player's first 2 cards are equal value, option to split for player = true
		if (playerHand[0].value === playerHand[1].value) {
			splitOption = true
		}
		dispatch({
			type: SET_INITIAL_DEAL,
			payload: {
				shoe,
				playerHand,
				dealerHand,
				playerScore,
				dealerScore,
				splitOption,
				playerAce11,
				dealerAce11
			}
		})
	}

	// from setInitialDeal() if any blackjacks are found (hands not yet set in state)
	const handleBlackjack = (playerBlackjack, dealerBlackjack, playerHand, dealerHand, shoe) => {
		if (playerBlackjack && dealerBlackjack) {
			displayAlert('Player and dealer blackjack. Push!')
			dispatch({
				type: HANDLE_BOTH_BLACKJACK,
				payload: { playerHand, dealerHand, shoe }
			})
		} else if (playerBlackjack) {
			displayAlert('Congratulations! You have blackjack!')
			dispatch({
				type: HANDLE_PLAYER_BLACKJACK,
				payload: { playerHand, dealerHand, shoe }
			})
		} else {
			displayAlert('Dealer has blackjack!')
			dispatch({
				type: HANDLE_DEALER_BLACKJACK,
				payload: { playerHand, dealerHand, shoe }
			})
		}
	}


	const hit = () => {
		// get info from state and create local variables
		const shoe = [...state.shoe]
		const playerHand = [...state.playerHand]
		let playerAce11 = state.playerAce11
		let playerScore = state.playerScore
		const playerBankroll = state.bankroll
		const doubledHand = false
		const bet = state.bet

		let nextCard = shoe.pop()

		// if next card is Ace and total hand value is 10 or less, set the Ace value to 11
		if (nextCard.value === 1 && playerScore <= 10) {
			nextCard.value = 11
			playerAce11 = true
		}

		playerScore += nextCard.value
		playerHand.push(nextCard)

		// if player has an ace in hand that is valued at 11 and score subsequently goes over 21, we can change the 11 to 1
		if (playerScore > 21 && playerAce11) {
			playerScore -= 10
			playerAce11 = false
		}

		if (playerScore > 21) {
			displayAlert('Player bust!')
			dispatch({
				// end the hand after displaying outcome, dealer wins: set all player options to false, set canPlaceBets to true
				type: PLAYER_BUST,
				payload: { shoe, playerHand, playerScore, playerBankroll, bet, doubledHand }
			})
		}
		else {
			dispatch({
				// update state values; options are kept on screen so user can hit or stay again
				type: PLAYER_SAFE,
				payload: { shoe, playerHand, playerScore, playerAce11 }
			})
		}
	}
	// if user chooses stay, options are removed from display; dealerMove() is next
	const stay = () => {
		dispatch({
			type: PLAYER_STAY,
		})
		setTimeout(() => {
			dealerMove()
		}, 1000)
	}


	const double = () => {
		displayAlert('Double Down!')
		let bet = state.bet * 2
		let playerBankroll = state.playerBankroll - state.bet
		const doubledHand = true
		let playerAce11 = state.playerAce11
		const shoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = [...state.playerHand]  // temp hands for player and dealer that we put in state after deal
		let playerScore = state.playerScore

		let nextCard = shoe.pop()

		// if player draws an Ace
		if (nextCard.value === 1 && playerScore <= 10) {
			nextCard.value = 11
		}

		playerScore += nextCard.value
		playerHand.push(nextCard)

		// if player has an Ace in the starting two cards, and draws card that would cause bust
		if (playerScore > 21 && playerAce11) {
			playerScore -= 10
		}

		if (playerScore > 21) {
			displayAlert('Player Bust! Try again!')
			dispatch({
				type: PLAYER_BUST,
				payload: { shoe, playerHand, playerScore, playerBankroll, bet, doubledHand }
			})
		}
		else {
			dispatch({
				type: PLAYER_DOUBLE,
				payload: { shoe, playerHand, playerScore, playerBankroll, bet }
			})
		}
		// player has no additional options, trigger dealerMove
		setTimeout(() => {
			dealerMove()
		}, 1000)
	}


	const dealerMove = () => {
		const shoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const dealerHand = [...state.dealerHand]  // temp hands for dealer that we put in state
		let dealerScore = state.dealerScore
		let dealerAce11 = state.dealerAce11

		// dealer action, set in state, and loop until dealer bust or makes a hand 17 or higher
		while (dealerScore <= 16) {
			let nextCard = shoe.pop()

			// if next card is Ace and total hand value is 10 or less, set the Ace to 11
			if (nextCard.value === 1 && dealerScore <= 10) {
				nextCard.value = 11
				dealerAce11 = false
			}
			dealerScore += nextCard.value
			dealerHand.push(nextCard)

			// if dealer has an ace in hand that is valued at 11 and score subsequently goes over 21, we can change the 11 to 1
			if (dealerScore > 21 && dealerAce11) {
				dealerScore -= 10
				dealerAce11 = false
			}
			if (dealerScore > 21) {
				displayAlert('Dealer bust!')
				dispatch({
					type: DEALER_BUST,
					payload: { shoe, dealerHand, dealerScore }
				})
			}
			else {
				dispatch({
					type: DEALER_SAFE,
					payload: { shoe, dealerHand, dealerScore, dealerAce11 }
				})
			}
		}
		setTimeout(() => {
			if (dealerScore <= 21) {
				determineWinner(dealerScore)
			}
		}, 1000)

	}

	// only runs if showdown occurs (pass dealerScore since function can run before state is updated)
	const determineWinner = (dealerScore) => {
		if (state.playerScore > dealerScore) {
			displayAlert('Player win!')
			dispatch({
				type: PLAYER_WIN,
			})
		}
		else if (dealerScore > state.playerScore) {
			displayAlert('Dealer Win. You Lose!')
			dispatch({
				type: DEALER_WIN,
			})
		}
		else {
			displayAlert("Push!")
			dispatch({
				type: PUSH,
			})
		}

	}


	return (
		<GlobalContext.Provider value={
			{
				...state,
				displayAlert,
				hideWelcome,
				setupGame,
				addFunds,
				placeBet,
				handleBlackjack,
				hit,
				stay,
				double,


			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext };