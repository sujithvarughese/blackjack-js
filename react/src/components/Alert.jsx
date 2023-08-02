import { useGlobalContext } from "../context/GlobalContext.jsx";

const Alert = () => {

	const { alert } = useGlobalContext()

	return (
		<div className="alert-text">
			{alert}
		</div>
	);
};

export default Alert;