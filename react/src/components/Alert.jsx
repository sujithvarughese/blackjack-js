import { useGlobalContext } from "../context/GlobalContext.jsx";

const Alert = () => {

	const { alert } = useGlobalContext()

	return (
		<div className="border-4 border-red-300">
			{alert}
		</div>
	);
};

export default Alert;