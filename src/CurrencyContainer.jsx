import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyCard from "./CurrencyCard";

function CurrencyContainer() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const relevantCurrencies = ["USD", "EUR", "JPY","GBP","AUD","CAD","CHF","CNY","SEK","NZD"];

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      const startDate = oneWeekAgo.toISOString().split("T")[0];
      const endDate = currentDate.toISOString().split("T")[0];

      const currencyData = await Promise.all(
        relevantCurrencies.map(async (currency) => {
          const response = await axios.get(
            `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=PLN&symbols=${currency}`
          );
          const rates = response.data.rates;
          const currentRate = 1 / rates[endDate][currency];
          const history = Object.entries(rates).map(([date, rate]) => ({
            name: date,
            rate: 1 / rate[currency],
          }));
          return {
            currency,
            rate: currentRate,
            history,
          };
        })
      );
      setCurrencies(currencyData);
      setLoading(false);
    };

    fetchCurrencies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {currencies.map((currencyData) => (
        <CurrencyCard key={currencyData.currency} {...currencyData} />
      ))}
    </div>
  );
}

export default CurrencyContainer;
