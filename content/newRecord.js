function handleNewRecord() {
    const currentUrl = window.location.href;
    let match = currentUrl.match(/o\/([^\/]+)\//);
    let objName = match && match[1] ? match[1] : '';

    let listItem = objName === 'Contact' ? document.querySelector(`li[data-target-selection-name='sfdc:StandardButton.${objName}.NewContact']`) : document.querySelector(`li[data-target-selection-name='sfdc:StandardButton.${objName}.New']`);

    if (listItem) {
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