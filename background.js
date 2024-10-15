chrome.commands.onCommand.addListener(async command => {
    if (command === 'new_record') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "clickNewButton"});
        }
      });
    }
    else{
        console.log('in bg.js else')
    }
  });