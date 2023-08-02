import { useGlobalContext } from "../context/GlobalContext.jsx";
import tableIMG from '../images/welcome.jpeg'

const Welcome = () => {

	const { hideWelcome } = useGlobalContext()



	return (
		<div className="flex flex-col m-12 gap-4">
			<div className=" text-center text-5xl">Welcome to Blackjack!</div>
			<img src={tableIMG} alt='welcome table'/>

			<button className="btn" onClick={hideWelcome}>Play</button>


		</div>
	);
};

const ComingSoon = () => {
	return (
		<>Feature coming soon!</>
	)

}

export default Welcome;