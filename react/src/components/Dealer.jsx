import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";
import cardBackIMG from "../images/backs/astronaut.svg";

const Dealer = () => {
  const { dealerHand, dealerScore, dealerCardShown } = useGlobalContext();



  return (
    <>
        {dealerHand.map((card, index) => {
          return (


                 (index === 1 && !dealerCardShown)?
                    <img key={card.img} className="card-img border-2 border-orange-500" src={cardBackIMG} alt="card-back" />
                    :
                    <img key={card.img} className="card-img border-2 border-orange-500" src={card.img} alt={card.value} />


          );
        })}

    </>
  );
};

export default Dealer;
