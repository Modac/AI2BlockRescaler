var value = 1

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
        //console.log("message recieved"+ msg);
        if(msg == "getValue"){
			port.postMessage(value);
		} else {
			value = Number(msg);
		}
  });
});

/*
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	// If the tabs url starts with "http://specificsite.com"...
	console.log(tab.url)
	if (tab.url.startsWith('http://ai2.appinventor.mit.edu/')) {
		console.log("Showing extension")
		// ... show the page action.
		chrome.pageAction.show(tabId);
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
*/

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlPrefix: 'http://ai2.appinventor.mit.edu/' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});