import { useGlobalContext } from "../context/GlobalContext.jsx";
import cardBackIMG from "../images/backs/astronaut.svg";

const Dealer = () => {
	const { dealerHand, dealerCardShown } = useGlobalContext();



	return (
		<>
			{
				dealerHand.map((card, index) =>
					(index === 1 && !dealerCardShown)
						?
						<img key={card.img} className="card-img" src={cardBackIMG} alt="card-back" />
						:
						<img key={card.img} className="card-img" src={card.img} alt={card.value} />
				)
			}
		</>
	);
};

export default Dealer;