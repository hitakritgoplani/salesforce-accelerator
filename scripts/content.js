chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "clickNewButton") {
        console.log('in new record case');
        var listItem = document.querySelector("li[data-target-selection-name='sfdc:StandardButton.Account.New']");

        if (listItem) {
            console.log('List item found');

            // Find the anchor tag within the list item
            var anchorTag = listItem.querySelector('a');

            if (anchorTag) {
                console.log('Anchor tag found');

                // Method 1: Standard click
                anchorTag.click();
                console.log('Standard click attempted on anchor tag');
            } else {
                console.error("Could not find the 'New' button.");
            }
        }
    }
});