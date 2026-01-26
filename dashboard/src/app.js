import React, { useEffect, useState } from "react";
import UsageBarChart from "./components/UsageBarChart";
import UsagePieChart from "./components/UsagePieChart";
import ActivityList from "./components/ActivityList";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial sessions from backend
  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/analytics");
      if (!res.ok) throw new Error("Failed to fetch sessions");
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000); // fallback every 30s
    return () => clearInterval(interval);
  }, []);

  // Listen to SSE for live updates
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:5000/api/analytics/stream");

    evtSource.onmessage = (e) => {
      try {
        const session = JSON.parse(e.data);
        setSessions(prev => [...prev, session]);
      } catch {}
    };

    evtSource.onerror = () => evtSource.close();
    return () => evtSource.close();
  }, []);

  const chartColors = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#C9CBCF"];

  // Compute summary for charts and KPIs
  const summary = sessions.reduce((acc, session) => {
    const existing = acc.find(i => i.domain === session.domain);
    const duration = session.duration || 0;

    if (existing) existing.totalTime += duration;
    else acc.push({ domain: session.domain, totalTime: duration, color: chartColors[acc.length % chartColors.length] });

    return acc;
  }, []);

  const totalTime = summary.reduce((acc, item) => acc + item.totalTime, 0);
  const hours = Math.floor(totalTime / 60);
  const mins = totalTime % 60;
  const totalSites = summary.length;
  const mostUsedSite = summary.length > 0
    ? summary.reduce((max, item) => (item.totalTime > (max.totalTime || 0) ? item : max)).domain
    : "N/A";
  const totalSessions = sessions.length;

  if (loading) return <p style={{textAlign:"center",marginTop:50}}>Loading dashboard...</p>;
  if (error) return <p style={{textAlign:"center",marginTop:50,color:"red"}}>{error}</p>;

  return (
    <div className="container">
      <h1>📊 Website Activity Dashboard</h1>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>Total Time Spent</h3><p>{hours} hr {mins} min</p></div>
        <div className="kpi-card"><h3>Websites Visited</h3><p>{totalSites}</p></div>
        <div className="kpi-card"><h3>Most Used Site</h3><p>{mostUsedSite}</p></div>
        <div className="kpi-card"><h3>Total Sessions</h3><p>{totalSessions}</p></div>
      </div>

      <div className="card"><h2>Daily Usage (Bar)</h2>
        {summary.length > 0 ? <UsageBarChart data={summary} /> : <p>No summary data available</p>}
      </div>

      <div className="card"><h2>Usage Share (Pie)</h2>
        {summary.length > 0 ? <UsagePieChart data={summary} /> : <p>No summary data available</p>}
      </div>

      <div className="card"><h2>📱 App Activity</h2>
        {sessions.length > 0 ? <ActivityList sessions={sessions} /> : <p>No session data available</p>}
      </div>
    </div>
  );
}
