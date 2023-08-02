import Game from "./components/Game.jsx";
import Welcome from "./components/Welcome.jsx";
import { useGlobalContext } from "./context/GlobalContext.jsx";


const App = () => {

   const { showWelcome } = useGlobalContext()

  return (
    <div className="">
       {showWelcome ? <Welcome /> : < Game/>}
    </div>
  )
}

export default App
