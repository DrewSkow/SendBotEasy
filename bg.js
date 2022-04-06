const arrOfPagesId = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.method){
        case 'openTab': {
           chrome.tabs.create({url:`${request.url}`, active:false}, v => arrOfPagesId.push(v.id));
           break;
        }
        case 'closeTabs': {
            chrome.tabs.query({active: false, title: "www.charmdate.com/clagt/admire/adr_error.php"}, arr => {
                arr.forEach(i => arrOfPagesId.push(i.id));
            })
            chrome.tabs.remove(arrOfPagesId);
        }
    }
});

//C666145


