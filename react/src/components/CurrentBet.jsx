import { useGlobalContext } from "../context/GlobalContext.jsx";
import classes from "./styles/CurrentBet.module.css";
import { GiMoneyStack } from "react-icons/gi";



const CurrentBet = () => {

	const { bet } = useGlobalContext()

	return (
		<div className={classes.container}>
			<div className={classes.bet}><div className={classes.icon}><GiMoneyStack /></div>Bet: ${bet}</div>
		</div>
	);
};



export default CurrentBet;