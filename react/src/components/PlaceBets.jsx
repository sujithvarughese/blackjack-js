import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import AddFunds from "./AddFunds.jsx";
import Menu from "./Menu.jsx";
import Button from "../ui/Button.jsx";
import { motion } from "framer-motion"
import classes from "./styles/PlaceBets.module.css";

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
		<motion.div
			initial={{ y: -30, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{y: -30, opacity: 0 }}
			className={classes.container}
		>
			{
				showAddFunds ?

					<AddFunds setShowAddFunds={setShowAddFunds} />
					:
					<form className="form border-4 border-red-700 flex flex-col justify-center w-full m-2 max-w-sm" onSubmit={handleSubmit}>
						<label
							className='form-label text-2xl mx-auto p-4'
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

						<div className="flex justify-around">
							<Button className="btn" type="submit">Deal!</Button>
							<Button className="btn" type="button" onClick={()=>setShowAddFunds(true)}>Reload</Button>
						</div>


					</form>
			}
		</motion.div>
	);
};

export default PlaceBets;