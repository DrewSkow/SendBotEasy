const arrOfPagesId = [];
const urls = [
    "http://www.charmdate.com/clagt/admire/adr_error.php",
    "http://www.charmdate.com/clagt/admire/search_matches2.php?womanid=null&Submit=Continue+%3E%3E"
]

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.method){
        case 'openTab': {
           chrome.tabs.create({url:`${request.url}`, active:false}, v => arrOfPagesId.push(v.id));
           break;
        }
        case 'closeTabs': {
            arrOfPagesId.length=0;
            chrome.tabs.query({active: false, url:urls}, arr => {
                arr.forEach(i => arrOfPagesId.push(i.id));
                chrome.tabs.remove(arrOfPagesId);
            })
        }
        case 'closeTab': {
            if(sender.url !== "http://www.charmdate.com/clagt/woman/women_profiles_allow_edit.php"){chrome.tabs.remove(sender.tab.id)}
        }
    }
});

//C666145


