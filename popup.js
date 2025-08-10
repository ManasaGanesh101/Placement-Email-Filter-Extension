const button = document.getElementById("toggle");

chrome.storage.local.get("filterOn", data => {
    const isOn = data.filterOn ?? true; //Default ON
    button.textContent = isOn ? "OFF" : "ON";
});

button.addEventListener("click", () => {

    chrome.storage.local.get("filterOn", data => {
        const newState = !(data.filterOn ?? true);
        chrome.storage.local.set({ filterOn: newState }, () => {
            button.textContent = newState ? "OFF" : "ON";

            //Reloading the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => location.reload()
                });
            });
        });
    });
});

