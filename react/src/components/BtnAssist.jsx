import { useGlobalContext } from "../context/GlobalContext.jsx";
import Button from "../ui/Button.jsx";

const BtnAssist = () => {

	const { setShowAssist } = useGlobalContext()


	const determineAssist = () => {
		setShowAssist(true)
	}

	return (
		<div>

				<Button onClick={determineAssist} className="btn absolute left-4">Help!</Button>

		</div>
	);
};

export default BtnAssist;