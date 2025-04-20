chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let currentUrl = window.location.href;
    let match = currentUrl.match(/o\/([^\/]+)\//);
    let objName = match && match[1] ? match[1] : '';
        
    if(request.action === "clickNewButton") {
        let listItem = document.querySelector(`li[data-target-selection-name='sfdc:StandardButton.${objName}.New']`);

        if(listItem) {
            let anchorTag = listItem.querySelector('a');
            if(anchorTag) {
                anchorTag.click();
            } else {
                console.error(`Could not find anchor tag within the '${objName}' New button.`);
            }
        } else {
            console.error(`'Could not find ${objName}.New'`);
        }
    }
    if(request.action === "openAppLauncher") {
        console.log('in openAppLauncher');
        let appLauncher = document.querySelector('div.appLauncher');

        if(appLauncher) {
            let button = appLauncher.querySelector('button');
            if(button) {
                button.click();
            } else {
                console.error('Error opening app launcher');
            }
        } else {
            console.error('Error opening app launcher');
        }
    }
    if(request.action === "openSetup") {
        let orgDomain = new URL(currentUrl).origin;
        console.log('Organization domain:', orgDomain);
        let setupUrl = `${orgDomain}/lightning/setup/SetupOneHome/home`;
        window.open(setupUrl, '_blank');
    }
    if(request.action === "openDev") {
        let orgDomain = new URL(currentUrl).origin;
        console.log('Organization domain:', orgDomain);
        let setupUrl = `${orgDomain}/_ui/common/apex/debug/ApexCSIPage`;
        window.open(setupUrl, '_blank');
    }
});