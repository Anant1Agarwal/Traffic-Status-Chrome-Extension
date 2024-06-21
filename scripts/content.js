
(async () => {
  try {
    const response = await fetch(window.location.href);
    const statusCode = response.status;
    console.log("HTTP Status Code:", statusCode);

    // Send a message to the background script to get the active tab ID
    chrome.runtime.sendMessage({action: "getTabId" }, (response) => {
      if (response && response.tabId) {
        const tabId = response.tabId.toString();
        let data = {};
        data[tabId] = statusCode;
        chrome.storage.local.set(data, () => {
          console.log('Status code stored:', statusCode);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching status code:", error);
  }
})();
