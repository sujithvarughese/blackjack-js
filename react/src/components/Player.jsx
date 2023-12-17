import { useGlobalContext } from "../context/GlobalContext.jsx";
import classes from "./styles/Hand.module.css";
const Player = () => {
   const { playerHand, playerHandSplit, doubledHand, splitHand } = useGlobalContext();


   return (
      <div>
         <div className={classes.playerHand}>
            {
               playerHand.map((card, index) =>
                   (doubledHand && index === 2)
                       ?
                       <img key={card.img} className={classes.doubled} src={card.img} alt={card.value} />
                       :
                       <img key={card.img} className={classes.card} src={card.img} alt={card.value} />
               )
            }
         </div>

         <div className={classes.playerHand}>
            {
               splitHand &&
               playerHandSplit.map((card, index) =>
                   (doubledHand && index === 2)
                       ?
                       <img key={card.img} className={classes.doubled} src={card.img} alt={card.value} />
                       :
                       <img key={card.img} className={classes.card} src={card.img} alt={card.value} />
               )
            }
         </div>






      </div>
   );
};

export default Player;