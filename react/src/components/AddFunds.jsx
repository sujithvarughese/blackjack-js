import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const AddFunds = ({ setShowAddFunds }) => {

	const [reloadAmount, setReloadAmount] = useState(500)

	const { addFunds } = useGlobalContext()
	// set state values as user types
	const handleChange = (e) => {
		setReloadAmount(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		addFunds(reloadAmount)
		setShowAddFunds(false)
	}


	return (
		<form className="form h-56 m-36 border-4 border-red-700 flex flex-col justify-center" onSubmit={handleSubmit}>

			<label className="form-label p-4 text-2xl" htmlFor="playerBankroll">Add Funds</label>
			<input
				className="form-input"
				type="number"
				name="funds"
				value={reloadAmount}
				min={100} max={1000000000}
				onChange={handleChange}
			/>
			<div className="flex gap-4">
				<button className="btn" type="submit">Reload!</button>
				<button className="btn" onClick={()=>setShowAddFunds(false)}>Cancel</button>
			</div>

		</form>
	);
};

export default AddFunds;