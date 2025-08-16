document.getElementById("start").addEventListener("click", async () => {
    let links = document.getElementById("links").value.split("\n").filter(l => l.trim() !== "");
    
    for (const link of links) {
        chrome.tabs.create({ url: link, active: false }, (tab) => {
            setTimeout(() => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["content.js"]
                });
            }, 5000); // wait 5 sec for page load
        });
    }
});