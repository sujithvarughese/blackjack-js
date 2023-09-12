import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";

const Assist = () => {
	const { playerScore, dealerFaceUp, playerAce11 } = useGlobalContext()

	const hit = "Hit"
	const stay = "Stay"
	const double = "Double"
	const [hint, setHint] = useState("")


	useEffect(() => {
		if (playerAce11) {
			switch (playerScore) {
				case 18:
					switch (dealerFaceUp) {
						case 3:
						case 4:
						case 5:
						case 6:
							setHint(double)
							break
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 17:
					switch (dealerFaceUp) {
						case 3:
						case 4:
						case 5:
						case 6:
							setHint(double)
							break
						case 2:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 16:
				case 15:
					switch (dealerFaceUp) {
						case 4:
						case 5:
						case 6:
							setHint(double)
							break
						case 2:
						case 3:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 14:
				case 13:
					switch (dealerFaceUp) {
						case 5:
						case 6:
							setHint(double)
							break
						case 2:
						case 3:
						case 4:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				default:
					setHint(stay)
			}
		} else {
			switch (playerScore) {
				case 20:
					setHint(stay)
					break
				case 19:
					setHint(stay)
					break
				case 18:
					setHint(stay)
					break
				case 16:
				case 15:
				case 14:
				case 13:
					switch (dealerFaceUp) {
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 12:
					switch (dealerFaceUp) {
						case 2:
						case 3:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 11:
					setHint(double)
					break
				case 10:
					switch (dealerFaceUp) {
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
							setHint(double)
							break
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 9:
					switch (dealerFaceUp) {
						case 3:
						case 4:
						case 5:
						case 6:
							setHint(double)
							break
						case 2:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 8:
					switch (dealerFaceUp) {
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				case 7:
				case 6:
				case 5:
				case 4:
				case 3:
				case 2:
					switch (dealerFaceUp) {
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
							setHint(hit)
							break
					}
				default:
					setHint(stay)
			}
		}
	}, [])


	console.log(hint);
	return (

			<div className="text-white text-2xl font-bold">
				{hint}!
			</div>


	);
};

export default Assist;