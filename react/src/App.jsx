import Game from "./components/Game.jsx";
import Welcome from "./components/Welcome.jsx";
import { useGlobalContext } from "./context/GlobalContext.jsx";

const App = () => {

   const { showWelcome } = useGlobalContext()

  return (
    <>
       {showWelcome ? <Welcome /> : < Game/>}
    </>
  )
}

export default App
