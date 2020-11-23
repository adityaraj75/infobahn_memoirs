/*
Called after creation of menu item, logs success/failure message
*/

function onCreation()
{
    if (browser.runtime.lastError)
    {
        console.log(`Error: ${browser.runtime.lastError}`);
    }
    else
    {
        console.log("Item created successfully");
    }
}

function onError(error)
{
    console.error(`Error: ${error}`);
}

/*
create Menu items
*/

browser.contextMenus.create({
    id: "addEntry",
    title: "Add Entry to memoir",
    contexts: ["selection"]
}, onCreation);


browser.contextMenus.create({
    id: "viewEntries",
    title: "View Entries in memoir",
    contexts: ["all"]
}, onCreation);

// /*
// menus items clicked event handler
// */

function sendAddEntryMessageToTabs(tabs)
{
    for (let tab of tabs)
    {
        browser.tabs.sendMessage(
            tab.id,
            {greeting: "addEntryToMemoir"}
        ).then(response => {
            console.log("Message from the content script:");
            console.log(response.response);
        }).catch(onError);
    }
}

browser.contextMenus.onClicked.addListener(function(info, tab)
{
    switch (info.menuItemId)
    {
        case "addEntry":
            browser.tabs.query({
                currentWindow: true,
                active: true
            }).then(sendAddEntryMessageToTabs).catch(onError);
            // jQuery.getScript("../contextScripts/context.js", function(){
            //     addEntryToMemoir();
            // });
            break;
        case "viewEntries":
            viewEntriesInMemoir();
            break;
    }
});



// /*
// function to add entry to local browser storage
// TODO : shift this to cloud storage facility
// */
//
// var globalKeyTime = "Timestamp";
// var globalKeyEntry = "Entry";
// var globalKeyUrl = "URL";
//
// function addEntryToMemoir()
// {
//     var selectedText = '';
//     var currentTime = '';
//     var currUrl = '';
//     if(window.getSelection)
//     {
//         selectedText = window.getSelection().toString();
//         browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
//             let tab = tabs[0]; // Safe to assume there will only be one result
//             currUrl = tab.url;
//         }, console.error);
//         currentTime = Math.floor(Date.now()/1000);
//         let memoirEntry = {};
//         memoirEntry[globalKeyTime] = currentTime;
//         memoirEntry[globalKeyUrl] = currUrl;
//         memoirEntry[globalKeyEntry] = selectedText;
//         browser.storage.local.set(memoirEntry);
//         console.log(memoirEntry);
//         return;
//     }
//     console.log("Error");
// }
//
function viewEntriesInMemoir()
{
    console.log("in view entries");
}
