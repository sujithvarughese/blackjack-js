import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import AddFunds from "./AddFunds.jsx";

const PlaceBets = () => {

	const { bet, placeBet, playerBankroll } = useGlobalContext()

	// local state for user input
	const [userBet, setUserBet] = useState(bet)

	const [showAddFunds, setShowAddFunds] = useState(false)

	const handleChange = (e) => {
		setUserBet(e.target.value)
	}

	// placeBet sets bet in global state, then triggers to deal cards
	const handleSubmit = (e) => {
		e.preventDefault()
		placeBet(userBet)
	}

	useEffect(() => {
		if (playerBankroll < 1) {
			setShowAddFunds(true)
		}
	}, [])

	return (
		<div>
			{
				showAddFunds ?

					<AddFunds setShowAddFunds={setShowAddFunds} />
					:
					<form className="form w-88 h-56 m-36 border-4 border-red-700 flex flex-col justify-center"
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
							min="1" max={playerBankroll}
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