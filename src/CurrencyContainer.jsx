import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyCard from "./CurrencyCard";

function CurrencyContainer() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const relevantCurrencies = ["USD", "EUR", "JPY"];

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
            `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/${startDate}/${endDate}/?format=json`
          );
          const rates = response.data.rates;
          const currentRate = rates[rates.length - 1].mid;
          const history = rates.map((rate) => ({
            name: rate.effectiveDate,
            rate: rate.mid,
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
