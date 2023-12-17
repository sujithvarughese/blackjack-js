import { useGlobalContext } from "../context/GlobalContext.jsx";
import cardBackIMG from "../images/backs/astronaut.svg";
import classes from "./styles/Hand.module.css";

const Dealer = () => {
	const { dealerHand, dealerCardShown } = useGlobalContext();



	return (
		<div className={classes.dealerHand}>
			{
				dealerHand.map((card, index) =>
					(index === 1 && !dealerCardShown)
						?
						<img key={card.img} className={classes.card} src={cardBackIMG} alt="card-back" />
						:
						<img key={card.img} className={classes.card} src={card.img} alt={card.value} />
				)
			}
		</div>
	);
};

export default Dealer;