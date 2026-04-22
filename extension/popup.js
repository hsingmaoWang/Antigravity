document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportBtn');
    const statusDiv = document.getElementById('status');

    exportBtn.addEventListener('click', async () => {
        statusDiv.textContent = "Extracting...";
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab.url.startsWith("https://patents.google.com/")) {
                statusDiv.textContent = "Error: Please navigate to a specific Google Patent page.";
                return;
            }

            // Execute the content script to extract data
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            if (results && results[0] && results[0].result) {
                const data = results[0].result;
                statusDiv.textContent = "Data extracted! Opening Antigravity...";
                // Send to background script to handle opening the tab we have permissions for
                chrome.runtime.sendMessage({ action: "openDapp", data: data });
            } else {
                 statusDiv.textContent = "Error: Could not extract data.";
            }

        } catch (error) {
            console.error(error);
            statusDiv.textContent = "Error occurred. Ensure you have the right permissions.";
        }
    });
});
