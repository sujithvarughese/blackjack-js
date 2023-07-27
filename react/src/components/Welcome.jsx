import { useGlobalContext } from "../context/GlobalContext.jsx";
import tableIMG from '../images/welcome.jpeg'

const Welcome = () => {

	const { hideWelcome } = useGlobalContext()



	return (
		<div className="flex flex-col m-12 gap-4">
			<div className=" text-center text-5xl">Welcome to Blackjack!</div>
			<img src={tableIMG} alt='welcome table'/>

			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto py-2 px-2 rounded text-xs w-32" onClick={hideWelcome}>Play</button>


		</div>
	);
};

const ComingSoon = () => {
	return (
		<>Feature coming soon!</>
	)

}

export default Welcome;