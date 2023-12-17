import { useGlobalContext } from "../context/GlobalContext.jsx";

const Bankroll = () => {

	const { playerBankroll } = useGlobalContext()

	return (
		<div>
			<div style={styles}>${playerBankroll}</div>
		</div>
	);
};

const styles = {
	"backgroundColor": "gold",
	"color": "black",
	"borderRadius": "5px",
	"fontWeight": "700"
}
export default Bankroll;