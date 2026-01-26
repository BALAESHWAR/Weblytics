// ---------------- HELPERS ----------------
function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

function sendMessageSafe(msg) {
  chrome.runtime.sendMessage(msg, () => {
    if (chrome.runtime.lastError) {
      // Background might be inactive — ignore
    }
  });
}

// ---------------- PAGE INFO ----------------
function sendPageInfo() {
  const pageInfo = {
    url: window.location.href,
    title: document.title || "Unknown Page",
    domain: window.location.hostname.replace("www.", "")
  };
  sendMessageSafe({ type: "PAGE_INFO", page: pageInfo });
}

// Send page info immediately
sendPageInfo();

// Detect URL changes
let lastUrl = window.location.href;
setInterval(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    sendPageInfo();
  }
}, 1000);

// ---------------- USER ACTIVITY & IDLE ----------------
let lastActivity = Date.now();
['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
  window.addEventListener(event, () => {
    lastActivity = Date.now();
  }, true);
});

// Send idle info periodically
setInterval(() => {
  const idleTime = Math.floor((Date.now() - lastActivity) / 1000);
  sendMessageSafe({ type: "PAGE_IDLE", url: window.location.href, idleTime });
}, 5000);

// ---------------- OPTIONAL: Token Check ----------------
// If you want, you can check if sessionToken exists
// and alert the user if not logged in:
chrome.storage.local.get(["sessionToken"], (result) => {
  if (!result.sessionToken) {
    console.warn("⚠️ No session token found. Please log in to track time.");
    sendMessageSafe({ type: "MISSING_TOKEN" });
  }
});
