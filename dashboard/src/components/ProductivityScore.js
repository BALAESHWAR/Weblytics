export default function ProductivityScore({ score }) {
  return (
    <div className="card">
      <h3>Productivity Score</h3>
      <h1>{score}/100</h1>
      <div className="progress">
        <div className="fill" style={{ width: `${score}%` }} />
      </div>
      <p>Keep up the productive work 💪</p>
    </div>
  );
}
