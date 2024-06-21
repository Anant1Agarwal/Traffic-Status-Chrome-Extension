
// You can put shared initialization code here if needed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabId") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        sendResponse({ tabId: currentTab.id });
      });
      return true; // This ensures the sendResponse function is called asynchronously.
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["/scripts/content.js"],
      });
    }
  });
  
//newbackground file for redirects
  const trackUrls = {
    urls: ["<all_urls>"]
  };
  
  
  const r = chrome.webRequest;
  
  r.onBeforeRequest.addListener(
    function(details) {
      console.log('onBeforeRequest', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onBeforeRequest";
    // details.requestIdEnhanced = details.requestId;
    // eventTracker.logRequestDetails(details);
    },
    trackUrls
    // , reqBodyHeaders
  );
  r.onBeforeSendHeaders.addListener(
    function(details) {
      console.log('onBeforeSendHeaders', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
      
    //   details.callerName = "onBeforeSendHeaders";
    //   details.requestIdEnhanced = details.requestId;
    //   addModifyRequestHeaders(details);
    //   eventTracker.logRequestDetails(details);
    //   if (blockRequests(details)) {
    //     return { cancel: true };
    //   }
    //   return { requestHeaders: details.requestHeaders };
    }, trackUrls
    // , reqHeadersBlocking
  );
  r.onSendHeaders.addListener(
    function(details) {
      console.log('onSendHeaders', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onSendHeaders";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }, trackUrls
    // ,reqHeaders
  );
  r.onHeadersReceived.addListener(
    function(details) {
      console.log('onHeadersReceived', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onHeadersReceived";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }, trackUrls
    // , resHeaders
  );
  r.onAuthRequired.addListener(
    function(details) {
      console.log('onAuthRequired', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onAuthRequired";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
      }, trackUrls
    // , resHeaders
  );
  r.onBeforeRedirect.addListener(
    function(details) {
      console.log('onBeforeRedirect', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onBeforeRedirect";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }, trackUrls
    // , resHeaders
  );
  r.onResponseStarted.addListener(
    function(details) {
      console.log('onResponseStarted', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onResponseStarted";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }, trackUrls
    // , resHeaders
  );
  r.onCompleted.addListener(
    function(details) {
      console.log('onCompleted', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onCompleted";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }
    , trackUrls
    // , resHeaders
  );
  r.onErrorOccurred.addListener(
    function(details) {
      console.log('onErrorOccurred', details);
      console.log(`url:${details.url}`)
      console.log(`method:${details.method}`)
      console.log('status code:', details.statusCode);
      console.log('time:', details.timeStamp);
      saveinlocal(details)
    //   details.callerName = "onErrorOccurred";
    //   details.requestIdEnhanced = details.requestId;
    //   eventTracker.logRequestDetails(details);
    }
    , trackUrls
    // , errorHeaders
  );


  async function saveinlocal(details){
    try {
        if (details.url.startsWith('chrome-extension://')) {
            return;}
      // Send a message to the background script to get the active tab ID
      chrome.runtime.sendMessage({ action: "getTabId" }, (response) => {
        if (response && response.tabId) {
          const tabId2 = response.tabId.toString() + "2";
          chrome.storage.local.get([tabId2], (result) => {
            let redirectdata = result[tabId2] || [];
            redirectdata.push(details);
            let dataToStore = {};
            dataToStore[tabId2] = redirectdata;
            chrome.storage.local.set(dataToStore, () => {
              console.log('Data stored in local:', details);
            });
          });
        }
      });
    } catch (error) {
      console.error("Error storing data:", error);
    }
  }
  
