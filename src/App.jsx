import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyContainer from "./CurrencyContainer";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Piotr Szelenberger-Kafel</h1>
      <h2>nr albumu: 144941</h2>
      <h1>Currency Converter</h1>
      <CurrencyContainer />
    </div>
  );
}

export default App
