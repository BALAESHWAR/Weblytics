import React, { useEffect, useState } from "react";

export default function KpiCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/summary")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const format = s => `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;

  return (
    <div className="kpi-grid">
      <div className="card">⏱ Total Time<br />{format(data.totalTime)}</div>
      <div className="card">🌐 Sites<br />{data.sitesVisited}</div>
      <div className="card">⚡ Productive<br />{format(data.productiveTime)}</div>
      <div className="card">🚫 Unproductive<br />{format(data.unproductiveTime)}</div>
    </div>
  );
}
