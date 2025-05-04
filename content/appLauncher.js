function handleAppLauncher() {
    console.log('in openAppLauncher');
    let appLauncher = document.querySelector('div.appLauncher');

    if (appLauncher) {
        let button = appLauncher.querySelector('button');
        if (button) {
            button.click();
        } else {
            console.error('Error opening app launcher');
        }
    } else {
        console.error('Error opening app launcher');
    }
}