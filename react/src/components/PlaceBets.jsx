import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import AddFunds from "./AddFunds.jsx";
import Menu from "./Menu.jsx";

const PlaceBets = () => {

	const { bet, placeBet, playerBankroll, shoe, displayAlert, setShowMenu, showMenu } = useGlobalContext()

	// local state for user input
	const [userBet, setUserBet] = useState(bet)

	const [showAddFunds, setShowAddFunds] = useState(false)

	const min = 1
	const max = 9999999999
	const handleChange = (e) => {
		setUserBet(e.target.value)
	}

	// placeBet sets bet in global state, then triggers to deal cards
	const handleSubmit = (e) => {
		e.preventDefault()
		if (playerBankroll < userBet) {
			setShowAddFunds(true)
		} else {
			placeBet(userBet)
		}
	}

	useEffect(() => {
		if (shoe.length < 12) {
			displayAlert("Please use new shoe")
			setShowMenu(true)
		}
	}, [])

	return (
		<div>
			{
				showAddFunds ?

					<AddFunds setShowAddFunds={setShowAddFunds} />
					:
					<form className="form border-4 border-red-700 flex flex-col justify-center"
					      onSubmit={handleSubmit}>

						<label
							className='form-label p-4 text-2xl'
							htmlFor="betAmount"
						>Place Bet!
						</label>

						<input
							className="form-input"
							type="number"
							name="bet"
							min={min} max={max}
							value={userBet}
							onChange={handleChange} />

						<div className="flex gap-4">
							<button className="btn" type="submit">Deal!</button>
							<button className="btn" type="button" onClick={()=>setShowAddFunds(true)}>Add Funds</button>
						</div>


					</form>
			}
		</div>
	);
};

export default PlaceBets;