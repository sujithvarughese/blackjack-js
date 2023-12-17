import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import {motion} from "framer-motion"

const Assist = () => {
	const { playerHand, playerScore, dealerFaceUp, playerAce11 } = useGlobalContext()

	const hit = "Hit"
	const stay = "Stay"
	const double = "Double"
	const [hint, setHint] = useState("")

	const assist = () => {
		if (!playerAce11) {
			if (playerScore >= 17) {
				setHint(stay)
			}
			else if (playerScore === 16 || playerScore === 15 || playerScore === 14 || playerScore === 13) {
				if (dealerFaceUp >= 2 && dealerFaceUp <= 6) {
					setHint(stay)
				} else {
					setHint(hit)
				}
			}
			else if (playerScore === 12) {
				if (dealerFaceUp === 4 || dealerFaceUp === 5 || dealerFaceUp === 6) {
					setHint(stay)
				} else {
					setHint(hit)
				}
			}
			else if (playerScore === 11) {
				if (playerHand.length === 2) {
					setHint(double)
				} else {
					setHint(hit)
				}
			}
			else if (playerScore === 10) {
				if (playerHand.length > 2 || dealerFaceUp === 10 || dealerFaceUp === 11) {
					setHint(hit)
				} else {
					setHint(double)
				}
			}
			else if (playerScore === 9) {
				if (playerHand.length === 2 && dealerFaceUp >= 3 && dealerFaceUp <= 6) {
					setHint(double)
				} else {
					setHint(hit)
				}
			} else {
				setHint(hit)
			}
		} else {
			if (playerScore >= 19) {
				setHint(stay)
			}
			else if (playerScore === 18) {
				if (dealerFaceUp === 9 || dealerFaceUp === 10 || dealerFaceUp === 11) {
					setHint(hit)
				} else if (playerHand.length > 2 || dealerFaceUp === 2 || dealerFaceUp === 7 || dealerFaceUp === 8) {
					setHint(stay)
				} else {
					setHint(double)
				}
			}
			else if (playerScore === 17) {
				if (playerHand.length === 2 && dealerFaceUp >= 3 && dealerFaceUp <= 6) {
					setHint(double)
				} else {
					setHint(hit)
				}
			}
			else if (playerScore === 16 || playerScore === 15) {
				if (playerHand.length === 2 && dealerFaceUp >= 4 && dealerFaceUp <= 6) {
					setHint(double)
				} else {
					setHint(hit)
				}
			}
			else if (playerScore === 14 || playerScore === 13) {
				if (playerHand.length === 2 && dealerFaceUp >= 5 && dealerFaceUp <= 6) {
					setHint(double)
				} else {
					setHint(hit)
				}
			}
		}
	}

	useEffect(() => {
		assist()
	}, [playerScore])


	return (

				<motion.div className="text-white text-4xl font-bold"
							initial={{ y: -30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{y: -30, opacity: 0 }}
				>
					{hint}!
				</motion.div>




	);
};



export default Assist;