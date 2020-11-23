// /*
// menus items clicked event handler
// */
//
// browser.contextMenus.onClicked.addListener(function(info, tab)
// {
//     switch (info.menuItemId)
//     {
//         case "addEntry":
//             addEntryToMemoir();
//             break;
//         case "viewEntries":
//             viewEntriesInMemoir();
//             break;
//     }
// });


/*
function to add entry to local browser storage
TODO : shift this to cloud storage facility
*/

"use-strict";

var globalKeyTime = "Timestamp";
var globalKeyEntry = "Entry";
var globalKeyUrl = "URL";

console.log("context script");

function addEntryToMemoir()
{
    var selectedText = '';
    var currentTime = '';
    var currUrl = '';
    if(window.getSelection)
    {
        selectedText = window.getSelection().toString();
        // browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        //     let tab = tabs[0]; // Safe to assume there will only be one result
        //     currUrl = tab.url;
        // }, console.error);
        currentTime = Math.floor(Date.now()/1000);
        let memoirEntry = {};
        memoirEntry[globalKeyTime] = currentTime;
        memoirEntry[globalKeyUrl] = currUrl;
        memoirEntry[globalKeyEntry] = selectedText;
        browser.storage.local.set(memoirEntry);
        console.log(memoirEntry);
        return;
    }
    console.log("Error");
}

browser.runtime.onMessage.addListener(request => {
    console.log("Message from the background script:");
    console.log(request.greeting);
    addEntryToMemoir();
    return Promise.resolve({response: "Hi from content script"});
});

//
// function viewEntriesInMemoir()
// {
//     console.log("in view entries");
// }
