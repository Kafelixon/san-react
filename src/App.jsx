import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyContainer from "./CurrencyContainer";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <h2>Piotr Szelenberger-Kafel</h2>
      <h4>nr albumu: 144941</h4>
      <CurrencyContainer />
    </div>
  );
}

export default App
