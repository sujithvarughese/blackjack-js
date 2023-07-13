import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {GlobalProvider} from "./context/GlobalContext.js";

ReactDOM.createRoot(document.getElementById('root')).render(
   <GlobalProvider>
      <React.StrictMode>
         <App />
      </React.StrictMode>,
   </GlobalProvider>

)
