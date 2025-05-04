chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "./options/options.html"});
});

chrome.commands.onCommand.addListener(async command => {
    if (command === 'newRecord' || command === 'openAppLauncher') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: command });
            }
        });
    }
});
