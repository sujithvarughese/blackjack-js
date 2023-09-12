import { useGlobalContext } from "../context/GlobalContext.jsx";

const Player = () => {
   const { playerHand, doubledHand } = useGlobalContext();


   return (
      <>
         {
            playerHand.map((card, index) =>
               (doubledHand && index === 2)
                  ?
                  <img key={card.img} className="card-img doubled" src={card.img} alt={card.value} />
                  :
                  <img key={card.img} className="card-img" src={card.img} alt={card.value} />
            )
         }
      </>
   );
};

export default Player;