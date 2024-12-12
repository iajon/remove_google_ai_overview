/**
 * The key for the extension's configuration storage.
 * 
 * @type {string}
 */
const NAMESPACE = "REMOVE_GOOGLE_AI_OVERVIEW";

/**
 * Returns the div containing the AI overview.
 * 
 * @returns {HTMLElement|null}
 *   The AI overview, or NULL if none is found.
 */
async function getAiOverviewBlock() {
  const xPathResult = document.evaluate("//h1[contains(., 'AI Overview')]", document, null, XPathResult.ANY_TYPE, null );
  const aiOverviewHeading = xPathResult.iterateNext();

  if (aiOverviewHeading instanceof HTMLHeadingElement) {
    return aiOverviewHeading.parentElement;
  } else {
    return null;
  }
}

/**
 * Sets the visibility of the AI overview block.
 */
async function setAiOverviewVisibility() {
  const aiOverviewBlock = await getAiOverviewBlock();
  const storage = await chrome.storage.sync.get(NAMESPACE).then(obj =>  { return obj[NAMESPACE] });

  if (aiOverviewBlock instanceof HTMLDivElement) {
    for (const child of aiOverviewBlock.children) {
      child.style.display = storage.hidden ? "none" : "";
    }
  }
}

// Main script execution.

/**
 * Sets the AI overview block's visibility in response to the extension configuration being changed.
 */
chrome.storage.sync.onChanged.addListener(async (changes, namespace) => {
  for (let [namespace, {oldValue, newValue}] of Object.entries(changes)) {
    if (namespace === NAMESPACE && oldValue.hidden !== newValue.hidden) {
      setAiOverviewVisibility();
    }
  }
});

/**
 * Sets the AI overview block's visibility on page load.
 */
window.addEventListener("load", async () => {
  setAiOverviewVisibility();
});
