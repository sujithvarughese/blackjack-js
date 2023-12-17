import { useGlobalContext } from "../context/GlobalContext.jsx";
import tableIMG from '../images/welcome.jpeg'
import { motion } from "framer-motion"
const Welcome = () => {

	const { hideWelcome } = useGlobalContext()



	return (
		<div className="flex flex-col gap-4 grid place-items-center">

			<img src={tableIMG} alt='welcome table' className="h-screen"/>

			<div className="absolute p-6 bg-black mx-auto text-center font-semibold rounded-md">
				<div className="text-white text-center text-2xl">
					Welcome to Beat Blackjack!
				</div>
				<motion.button
					whileHover={{ scale: 1.2 }}
					className="btn w-56 mx-auto text-center" onClick={hideWelcome}
				>
					Play
				</motion.button>

			</div>


		</div>
	);
};

const ComingSoon = () => {
	return (
		<>Feature coming soon!</>
	)

}

export default Welcome;