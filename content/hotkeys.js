let shortcutMap = {};

chrome.storage.sync.get('userShortcuts', function(data) {
    shortcutMap = data.userShortcuts || {};
    console.log('Loaded user shortcuts from storage:', shortcutMap);
});

function handleHotkey(keyData) {
    // Check if Shift is pressed AND the pressed key is a single character
    console.log('Key pressed:', keyData); // Log the key data for debugging
    if (keyData.shiftKey && keyData.altKey && keyData.key.length === 1) {
        const currentUrl = window.location.href;
        const orgDomain = new URL(currentUrl).origin;
        const shortcutInfo = shortcutMap[keyData.key.toLowerCase()]; // Get the shortcut object

        if (shortcutInfo && shortcutInfo.endpoint) { // Check if the object and the link exist
            const finalURL =  `${orgDomain}${shortcutInfo.endpoint}`;
            window.open(finalURL, '_blank');
        }
    }
}