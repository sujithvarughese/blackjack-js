import { useGlobalContext } from "../context/GlobalContext.jsx";

const Player = () => {
  const { bankroll, playerScore, playerHand, bet, shoe } = useGlobalContext();


  return (
    <>
        {playerHand.map((card, index) => {
          return <img key={card.img} className="card-img border-2 border-orange-500" src={card.img} alt={card.value}/>
        })}

     </>

  );
};

export default Player;
