(function () {
    const keywords = ["placement", "interview", "offer", "recruitment", "hiring"];

    function filterEmails() {
        chrome.storage.local.get("filterOn", data => {
            const isOn = data.filterOn ?? true;

            const emailRows = document.querySelectorAll("tr.zA");

            if (!isOn) {
                // Show all emails if filter is off
                emailRows.forEach(row => row.style.display = "");
                return;
            }

            // Filter emails when filter is on
            emailRows.forEach(row => {
                const subject = row.querySelector(".bog")?.innerText.toLowerCase() || "";
                const snippet = row.querySelector(".y2")?.innerText.toLowerCase() || "";
                const hasKeyword = keywords.some(word =>
                    subject.includes(word) || snippet.includes(word)
                );

                row.style.display = hasKeyword ? "" : "none";
            });
        });
    }

    // Listen for storage changes (triggered by popup toggle)
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes.filterOn) {
            filterEmails();
        }
    });

    // Observe changes in Gmail's DOM and reapply filter
    const observer = new MutationObserver(filterEmails);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    filterEmails();
})();
