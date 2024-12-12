// Main script execution.

/**
 * Sets default extension configuration and badge text.
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({"REMOVE_GOOGLE_AI_OVERVIEW": { hidden: false }});
  chrome.action.setBadgeText({ text: 'OFF' });
});

/**
 * Set the badge text in response to a configuration change.
 */
chrome.storage.sync.onChanged.addListener(async (changes, namespace) => {
  for (let [namespace, {oldValue, newValue}] of Object.entries(changes)) {
    if (namespace === "REMOVE_GOOGLE_AI_OVERVIEW") {
      chrome.action.setBadgeText({ text: newValue.hidden ? 'ON' : 'OFF' });
    }
  }
});

/**
 * Sets the badge text when a browser tab is updated.
 *
 * This listener mainly serves to set the badge text after closing and reopening Chrome.
 */
chrome.tabs.onUpdated.addListener(async function() {
  const storage = await chrome.storage.sync.get("REMOVE_GOOGLE_AI_OVERVIEW").then(obj =>  { return obj.REMOVE_GOOGLE_AI_OVERVIEW ?? undefined });
  const text = storage.hidden ? 'ON' : 'OFF'

  chrome.action.setBadgeText({ text: text });
});
