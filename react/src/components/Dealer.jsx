import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";
import cardBackIMG from "../images/backs/astronaut.svg";

const Dealer = () => {
  const { dealer } = useGlobalContext();
  const { hasBlackjack, hand, score } = dealer;

  return (
    <div className="flex absolute top-0 justify-center">

      <div className="text-4xl text-stone-100 self-center">{dealer.score}</div>

      <div className="flex scale-50 gap-1">
        {dealer?.hand.map((card, index) => {
          return (
            <div key={index}>
              {
                 index === 1 ?
                    <img src={cardBackIMG} alt="card-back" />
                    :
                    <img src={card.img} alt={card.value} />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dealer;
