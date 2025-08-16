(async function () {
    function extractText(selector) {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : "";
    }

    let data = {
        name: extractText(".pv-text-details__left-panel h1"),
        url: window.location.href,
        about: extractText(".pv-shared-text-with-see-more .visually-hidden"),
        bio: extractText(".text-body-medium.break-words"),
        location: extractText(".pb2 .t-black--light"),
        follower_count: parseInt((extractText("span.t-bold") || "0").replace(/\D/g, "")),
        connection_count: parseInt((extractText(".t-bold span") || "0").replace(/\D/g, ""))
    };

    console.log("Scraped Data:", data);

    // Send to backend
    await fetch("http://localhost:5000/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
})();