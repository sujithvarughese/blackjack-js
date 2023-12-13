import { useGlobalContext } from "../context/GlobalContext.jsx";
import classes from "./styles/Player.module.css";
const Player = () => {
   const { playerHand, playerHandSplit, doubledHand, splitHand } = useGlobalContext();


   return (
      <div className={classes.playerHand}>
         <div className="hand player">
            {
               playerHand.map((card, index) =>
                   (doubledHand && index === 2)
                       ?
                       <img key={card.img} className="card-img doubled" src={card.img} alt={card.value} />
                       :
                       <img key={card.img} className="card-img" src={card.img} alt={card.value} />
               )
            }
         </div>

         <div className="hand player">
            {
               splitHand &&
               playerHandSplit.map((card, index) =>
                   (doubledHand && index === 2)
                       ?
                       <img key={card.img} className="card-img doubled" src={card.img} alt={card.value} />
                       :
                       <img key={card.img} className="card-img" src={card.img} alt={card.value} />
               )
            }
         </div>






      </div>
   );
};

export default Player;