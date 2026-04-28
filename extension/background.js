chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openDapp") {
        const patentData = request.data;
        // The URL of your local Antigravity server
        //local後台    const targetUrl = "http://localhost:5173/";
        const targetUrl = "https://antigravity-phi-six.vercel.app";

        chrome.tabs.create({ url: targetUrl }, (newTab) => {
            // We wait for the new tab to be fully loaded so we can inject the script safely
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === newTab.id && changeInfo.status === 'complete') {
                    // Remove the listener once caught
                    chrome.tabs.onUpdated.removeListener(listener);

                    // Inject data into local storage of the frontend
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: injectData,
                        args: [patentData]
                    });
                }
            });
        });
    }
});

function injectData(data) {
    localStorage.setItem('antigravity_imported_patent', JSON.stringify(data));
    // Immediately dispatch a custom event so the React app can pick it up without hard refresh requirement
    window.dispatchEvent(new Event('antigravity_patent_imported'));
    console.log("Antigravity: Data successfully injected from Extension.");
}
