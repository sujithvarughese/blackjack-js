import { useGlobalContext } from "../context/GlobalContext.jsx";

const Alert = () => {

	const { alertText } = useGlobalContext()

	return (
		<div className="alert-text">
			{alertText}
		</div>
	);
};

export default Alert;