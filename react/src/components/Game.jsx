import Menu from "./Menu.jsx";
import Player from "./Player.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";

const Game = () => {

	const { showMenu, showDealButton, shoe, canPlaceBets, initialDeal, player, dealer } = useGlobalContext()

	const [bet, setBet] = useState(25)

	const handleSubmit = (e) => {
		e.preventDefault()
		initialDeal(bet)
	}

	console.log(player.hand);
	console.log(dealer.hand);
	console.log(shoe);


	return (
		<div>
			{ showMenu && <Menu />}

			{ canPlaceBets &&
				<form onSubmit={handleSubmit}>
					<label htmlFor="betAmount">Bet</label>
					<input type="number" name="bet" min="25" value={bet} onChange={e=>setBet(e.target.value)}/>
					<button type="submit">Deal!</button>
				</form>
			}

			{
				player?.hand.map((card, index) => {
					return (
						<div key={index}>
							{card.value}
							<img src={card.img} alt={card.value}/>
						</div>
					)
				})
			}

			{
				dealer?.hand.map((card, index) => {
					return (
						<div key={index}>
							{card.value}
							<img src={card.img} alt={card.value}/>
						</div>
					)
				})
			}
			<div>We will be right back....</div>


		</div>
	)
}

export default Game