/**
 * Sets the state of the "hide AI overview" checkbox on pop-up load.
 */
async function setInitialCheckboxState() {
  const storage = await chrome.storage.sync.get("REMOVE_GOOGLE_AI_OVERVIEW").then(obj =>  { return obj.REMOVE_GOOGLE_AI_OVERVIEW });
  const checkbox = document.getElementById('hide-ai-overview');

  // Set checkbox state.
  checkbox.checked = storage.hidden;

  // Wait to add the CSS animations until the popup has loaded.
  setTimeout(function(){
    checkbox.nextElementSibling.classList.add('smooth-transition');
  },500);
}

// Main script execution.

/**
 * Sets the configuration of the extension when the "hide AI overview" checkbox state is changed.
 */
document.getElementById('hide-ai-overview').addEventListener('change', async function () {
  // Retrieve storage as to not override other configuration options in the future.
  const storage = await chrome.storage.sync.get("REMOVE_GOOGLE_AI_OVERVIEW").then(obj =>  { return obj.REMOVE_GOOGLE_AI_OVERVIEW });

  if (this.checked) {
    storage.hidden = true;
    chrome.storage.sync.set({ "REMOVE_GOOGLE_AI_OVERVIEW": storage });
  }
  else {
    storage.hidden = false;
    chrome.storage.sync.set({ "REMOVE_GOOGLE_AI_OVERVIEW": storage });
  }
});

setInitialCheckboxState();


