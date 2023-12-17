import { useGlobalContext } from "../context/GlobalContext.jsx";
import Button from "../ui/Button.jsx";
import { motion } from "framer-motion";

const PlayerOptions = () => {

	const {
		//newDealOption,
		//insuranceOption,
		splitOption,
		doubleOption,
		hitOption,
		stayOption,
		hit,
		stay,
		double,
		split,
	} = useGlobalContext()

	return (
		<motion.div className="flex gap-3"
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{y: -10, opacity: 0 }}
		>

			{hitOption &&
				<>
					<Button onClick={hit} className="btn">hit!</Button>
					<Button onClick={stay} className="btn">stay!</Button>
				</>

			}
			{stayOption &&
				<button onClick={stay} className="btn">stay!</button>
			}{/*
			{newDealOption &&
				<button onClick={newDeal} className="btn">Play Again!</button>
			}
			{insuranceOption &&
				<button onClick={insurance} className="btn">Take Insurance!</button>
			}
			{splitOption &&
				<Button onClick={split} className="btn">split!</Button>
			}*/}
			{doubleOption &&
				<Button onClick={double} className="btn">double!</Button>
			}



		</motion.div>
	);
};

export default PlayerOptions;