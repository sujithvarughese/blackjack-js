import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

const Dealer = () => {

	const { dealer } = useGlobalContext()
	const { hasBlackjack, hand, score } = dealer


	return (
		<div>
			{dealer.score}
			<div className="flex">
				{
					dealer?.hand.map((card, index) => {
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

export default Dealer;