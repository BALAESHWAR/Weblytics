export default function ActivityList({ sessions }) {
  // Optional: map domains to friendly names
  const domainNames = {
    "linkedin.com": "LinkedIn",
    "youtube.com": "YouTube",
    "web.whatsapp.com": "WhatsApp",
    "github.com": "GitHub",
    "leetcode.com": "LeetCode",
    "stackoverflow.com": "StackOverflow",
    "chatgpt.com": "ChatGPT"
  };

  return (
    <div className="activity-list">
      {sessions.slice(-10).reverse().map((s, i) => (
        <div key={i} className="app-row">
          <span>{domainNames[s.domain] || s.domain}</span>
          <span>{s.duration}s</span>
        </div>
      ))}
    </div>
  );
}
