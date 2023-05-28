import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function CurrencyCard({ currency, rate, history }) {
  const lastDayRate = history[history.length - 2]?.rate;
  const rateChange = rate - lastDayRate;
  const rateChangePercentage = ((rateChange / lastDayRate) * 100).toFixed(2);
  const arrowColor = rateChangePercentage > 0 ? "green" : "red";

  return (
    <div className="card">
      <h2>{currency}</h2>
      <h3>{rate.toFixed(2)}</h3>
      <h4 style={{ color: arrowColor }}>
        {rateChangePercentage > 0 ? "↑" : "↓"} {Math.abs(rateChangePercentage)}%
      </h4>
      <LineChart width={320} height={200} data={history}>
        <Line type="monotone" dataKey="rate" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default CurrencyCard;
