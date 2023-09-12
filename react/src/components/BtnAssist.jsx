import { useGlobalContext } from "../context/GlobalContext.jsx";

const BtnAssist = () => {

	const { setShowAssist } = useGlobalContext()


	const determineAssist = () => {
		setShowAssist(true)
	}

	return (
		<div>

				<button onClick={determineAssist} className="btn absolute left-4">Help!</button>

		</div>
	);
};

export default BtnAssist;