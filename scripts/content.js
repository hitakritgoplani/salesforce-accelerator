chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let currentUrl = window.location.href;
    let match = currentUrl.match(/o\/([^\/]+)\//);
    let objName = match && match[1] ? match[1] : '';
        
    if (request.action === "clickNewButton") {
        console.log('in new record case');
        let listItem = document.querySelector(`li[data-target-selection-name='sfdc:StandardButton.${objName}.New']`);

        if (listItem) {
            console.log('List item found');
            let anchorTag = listItem.querySelector('a');
            if (anchorTag) {
                anchorTag.click();
            } else {
                console.error(`Could not find anchor tag within the '${objName}' New button.`);
            }
        } else {
            console.error(`'Could not find ${objName}.New'`);
        }
    }
});