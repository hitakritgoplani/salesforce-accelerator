let shortcutMap = {};

chrome.storage.sync.get('userShortcuts', function(data) {
    shortcutMap = data.userShortcuts || {};
    console.log('Loaded user shortcuts from storage:', shortcutMap);
});

function handleHotkey(keyData) {
    // Check if Shift is pressed AND the pressed key is a single character
    if (keyData.shiftKey && keyData.altKey && keyData.key.length === 1) {
        const currentUrl = window.location.href;
        const orgDomain = new URL(currentUrl).origin;
        const shortcutInfo = shortcutMap[keyData.key.toLowerCase()]; // Get the shortcut object

        if (shortcutInfo && shortcutInfo.link) { // Check if the object and the link exist
            const finalURL = shortcutInfo.link.startsWith('/') ? `${orgDomain}${shortcutInfo.link}` : shortcutInfo.link;
            window.open(finalURL, '_blank');
        }
    }
}