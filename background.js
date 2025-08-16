const profileLinks = [
  "https://www.linkedin.com/in/saurabh-karki-920086280/",
  "https://www.linkedin.com/in/ramandeep-kaur-955492326/",
  "https://www.linkedin.com/in/karan-pandey-5854352b1/"
];

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "scrape") {
    for (const url of profileLinks) {
      chrome.tabs.create({ url }, (tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: scrapeProfile
        }, async (results) => {
          const data = results[0].result;
          console.log("Scraped:", data);

          // Send to backend
          await fetch("http://localhost:3000/profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
        });
      });
    }
  }
});

function scrapeProfile() {
  const name = document.querySelector(".text-heading-xlarge")?.innerText || "";
  const about = document.querySelector(".pv-shared-text-with-see-more")?.innerText || "";
  const location = document.querySelector(".text-body-small")?.innerText || "";
  const bio = document.querySelector(".pv-text-details__left-panel")?.innerText || "";
  const followerCount = parseInt(document.body.innerText.match(/(\d+) followers/)?.[1] || 0);
  const connectionCount = parseInt(document.body.innerText.match(/(\d+) connections/)?.[1] || 0);

  return { name, about, bio, location, followerCount, connectionCount, url: window.location.href };
}
