console.log("✅ Website Time Tracker running");

/* ---------------- GLOBAL STATE ---------------- */

let activeTabId = null;
let activeTabUrl = null;
let activeTabTitle = null;
let startTime = null;

/* ---------------- HELPER FUNCTIONS ---------------- */

// Extract domain name safely
function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

// Send tracking data to backend
async function sendTrackingData() {
  if (!activeTabUrl || !startTime) return;

  const duration = Math.floor((Date.now() - startTime) / 1000);
  if (duration < 1) return;

  if (activeTabUrl.startsWith("chrome://")) return;

  const payload = {
    url: activeTabUrl,
    domain: getDomain(activeTabUrl),
    title: activeTabTitle || getDomain(activeTabUrl),
    duration,
    timestamp: new Date().toISOString()
  };

  console.log("📤 Sending tracking data:", payload);

  try {
    await fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("❌ Failed to send data:", err);
  }
}

// Reset tracking timer
function resetTimer(tab) {
  activeTabId = tab.id;
  activeTabUrl = tab.url;
  activeTabTitle = tab.title;
  startTime = Date.now();
}

/* ---------------- TAB SWITCH TRACKING ---------------- */

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("🔄 Tab activated:", tabId);

  if (activeTabId !== null) {
    await sendTrackingData();
  }

  try {
    const tab = await chrome.tabs.get(tabId);
    resetTimer(tab);
  } catch (err) {
    console.error("Tab fetch failed:", err);
  }
});

/* ---------------- URL CHANGE TRACKING ---------------- */

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.url) {
    console.log("🌐 URL changed:", changeInfo.url);

    sendTrackingData();
    resetTimer(tab);
  }
});

/* ---------------- WINDOW FOCUS TRACKING ---------------- */

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;

  console.log("🪟 Window focus changed");

  if (activeTabId !== null) {
    await sendTrackingData();
  }

  const tabs = await chrome.tabs.query({ active: true, windowId });
  if (tabs.length > 0) {
    resetTimer(tabs[0]);
  }
});

/* ---------------- EXTENSION SUSPEND ---------------- */

chrome.runtime.onSuspend.addListener(async () => {
  console.log("⏹️ Extension suspending");
  await sendTrackingData();
});

/* ---------------- MESSAGE LISTENER (SAFE) ---------------- */

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "POPUP_OPENED") {
    sendResponse({ status: "tracking_active" });
  }
});
