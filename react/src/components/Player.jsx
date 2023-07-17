import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";

const Player = () => {
  const { player, bet } = useGlobalContext();

  return (
    <div className="absolute top-64 justify-center">

       <div className="flex justify-around pt-11 text-4xl text-stone-100">
         <div>Bet: {bet}</div>
         <div>Bankroll: {player?.bankroll}</div>
         <div>{player?.score}</div>
      </div>


      <div className="flex scale-50 gap-1">
        {player?.hand.map((card, index) => {
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
