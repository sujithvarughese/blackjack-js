import { useGlobalContext } from "../context/GlobalContext.jsx";

const Player = () => {
  const { playerBankroll, playerScore, playerHand, bet, shoe } = useGlobalContext();



  return (
    <div className="absolute top-64 justify-center">

       <div className="flex justify-around pt-11 text-4xl text-stone-100">
         <div>Bet: {bet}</div>
         <div>Bankroll: {playerBankroll}</div>
         <div>{playerScore}</div>
      </div>


      <div className="flex scale-50 gap-1">
        {playerHand.map((card, index) => {
          return (
            <div key={index}>
              <img src={card.img} alt={card.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Player;
