import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

const Player = () => {

	const { player } = useGlobalContext()

	useEffect(()=> {

	},[player])

	return (
		<div>
			<div>{player?.score}</div>
			<div>{player?.bankroll}</div>

			<div className="flex">
				{
					player?.hand.map((card, index) => {
						return (
							<div key={index}>

								<img src={card.img} alt={card.value}/>
							</div>
						)
					})
				}
			</div>

		</div>
	);
};

export default Player;