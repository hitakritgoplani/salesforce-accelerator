// content.js
document.addEventListener('keydown', function(event) {
    const keyData = {
        key: event.key,
        code: event.code,
        shiftKey: event.shiftKey,
        altKey: event.altKey
    };
    handleHotkey(keyData); // Pass keyData to handleHotkey
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "newRecord") {
        handleNewRecord();
    } else if (request.action === "openAppLauncher") {
        handleAppLauncher();
    }
});