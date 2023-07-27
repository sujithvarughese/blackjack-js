import Menu from "./Menu.jsx";
import Player from "./Player.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import PlaceBets from "./PlaceBets.jsx";
import Dealer from "./Dealer.jsx";
import Alert from "./Alert.jsx";
import PlayerOptions from "./PlayerOptions.jsx";
import tableIMG from '../images/table-main.jpeg'
import { SETUP_GAME } from "../context/actions.js";
import deck from "../deck.js";

const Game = () => {

	const { alert, showAlert, handInProgress, showMenu, playerOptions, canPlaceBets, bet, player, dealer, handleBlackjack, handleInitialDeal } = useGlobalContext()

	// after user selects values, create the shoe with appropriate number of decks
	const setupGame = (numDecks, playerBankroll, bet) => {
		const newShoe = []
		for (let i = 0; i < numDecks; i++) {
			newShoe.push(...deck)
			newShoe.sort(() => Math.random() - 0.5)
		}
		newShoe.sort(() => Math.random() - 0.5)
		initialDeal(playerBankroll, bet, newShoe)
	}

	const initialDeal = (playerBankroll, bet, shoe) => {

		const playerHand = []  // temp hands for player and dealer that we put in state after deal
		const dealerHand = []

		//----deal out cards, if Ace is dealt, change value from 1 to 11---//
		let nextCard = shoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		let playerScore = nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		let dealerScore = nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		playerScore += nextCard.value

		nextCard = shoe.pop()
		if (nextCard.value === 1) {
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
		if (playerBlackjack || dealerBlackjack) {
			handleBlackjack(playerBlackjack, dealerBlackjack)
		}
		// if no blackjacks, set values to global state, then prompt user options
		let splitOption = false
		if (playerHand[0].value === playerHand[1].value) {
			splitOption = true
		}
		// set all these values into global state
		handleInitialDeal(shoe, playerHand, dealerHand, playerScore, dealerScore, playerBankroll, bet, splitOption)
	}

	return (
		<div className="">
			<img src={tableIMG} className="" alt="table"/>
			<div className="flex justify-center">
				{ showMenu && <Menu setupGame={setupGame}/>}
				{ canPlaceBets && <PlaceBets />}
				{ showAlert && <Alert />}
				{ handInProgress  && <Player />}
				{ handInProgress && <Dealer />}
				{ playerOptions && <PlayerOptions /> }
			</div>

		</div>
	)
}

export default Game