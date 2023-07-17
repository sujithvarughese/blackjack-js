import Game from "./components/Game.jsx";
import Welcome from "./components/Welcome.jsx";
import { useGlobalContext } from "./context/GlobalContext.jsx";

const App = () => {

   const { showWelcome } = useGlobalContext()

  return (
    <div className="max-w-5xl border-4 border-red-300">
       {showWelcome ? <Welcome /> : < Game/>}
    </div>
  )
}

export default App
