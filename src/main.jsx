import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {SpoContext} from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SpoContext>
    <App />
  </SpoContext>
  </BrowserRouter>
)
