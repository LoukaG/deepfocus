let blockSites;

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  chrome.storage.sync.get(["blockSites"]).then((result) => {
    blockSites = result.blockSites;

    chrome.storage.local.get("isDeepWork", function (result) {
      if (isBlockedSite(details.url) && result.isDeepWork) {
        var tabId = details.tabId;
        var newUrl = chrome.runtime.getURL("../block.html");

        chrome.tabs.update(tabId, { url: newUrl }, function (updatedTab) {
          if (chrome.runtime.lastError) {
            console.error(
              'An error occurred while trying to block "' +
                details.url +
                '" page :',
              chrome.runtime.lastError
            );
          } else {
            console.log(
              '"' + details.url + '" successfully blocked!',
              updatedTab
            );
          }
        });
      }
    });
  });
});

function isBlockedSite(url) {
  //check if url is in blockSites
  if (url.includes("/")) {
    url = url.split("/")[2];
    for (let i = 0; i < blockSites.length; i++)
      if (url.includes(blockSites[i])) return true;
  }
  return false;
}
