chrome.runtime.sendMessage({ type: "POPUP_OPENED" }, () => {
  if (chrome.runtime.lastError) {
    // Ignore popup listener errors
  }
});
