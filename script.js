const checkSended = () => {
    chrome.runtime.sendMessage({method: "closeTabs"}, ()=>{
        localStorage.clear();
        window.location.href="/clagt/woman/women_profiles_allow_edit.php";
    });
}

if(+localStorage.getItem("sended") >= 50){
    checkSended();
} else{
    chrome.storage.sync.get("switch").then(v=>v.switch).then(v=>v===true?script():false)
}


const script = () => {
    const url = document.location;
    const pathname = url.pathname;
    const urlSearch = url.search;
    const regexW = /=\w{7}/;
    const regexM = /=\w{7,10}/;
    const regexId = /=\w{5,7}-\w{1,5}/;
    const sendButton = document.querySelector("input[name='sendmailsub']");

    const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

    const closeOnMaxOrError = () => {
        const p = document.querySelector("p");
        if(!!p? p.innerText.indexOf("to maximum quantity")>-1 : false){
            localStorage.setItem("sended", "50");
        } else {window.close()}
    }
    
    const insertGirlId = () => {
        let girlId = prompt("Введите ID девушки");
        if(!!localStorage.sended){
            confirm("Начать поиск сначала?") && localStorage.clear();
        }
        let sended = prompt("Введите количество отправленных заявок") || 0;
        localStorage.setItem("sended", sended);
        document.location.href = `http://www.charmdate.com/clagt/admire/search_matches2.php?womanid=${girlId}&Submit=Continue+%3E%3E`;
    }

    const setPointsInMatchPreference = () => { 
        document.querySelector('input[value = "last_login"]').checked=true
        const date = new Date();
        document.querySelector('select[name = "year_s"]').value=date.getUTCFullYear();
        document.querySelector('select[name = "month_s"]').value=date.getUTCMonth()<10? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1;
        document.querySelector('select[name = "day_s"]').value=date.getUTCDate()<10? "0"+(date.getUTCDate()) : date.getUTCDate();
        document.querySelector(`input[value = "Y"]`).checked=true;
        document.querySelectorAll(`input[name="top20"]`)[1].checked=true;    
        document.querySelector(`input[value="Search"]`).click();
    }

    const openAllMen = () => {
        chrome.runtime.sendMessage({method: "clearArray"});
        const tables = document.querySelectorAll("table")[24].children[0];
        if (!!tables){
            const quantity = tables.children.length;
            let i = 1;
            let loop = setInterval(()=>{
                if(+localStorage.getItem("sended") >= 50){checkSended()};
                const rawRef = tables.children[i].children[8].children[0].href.split("'");
                const ref = rawRef[1].split("%");
                chrome.runtime.sendMessage({method: "openTab", url:`http://www.charmdate.com/clagt/admire/${ref[0]}`});
                if(i===quantity-1){clearInterval(loop)}
                i++;
            }, 1000);
        } else{
            openAllMen();
        }
    }

    const switchPage = () => {
        if(+localStorage.getItem("sended") >= 50){
            chrome.runtime.sendMessage({method: "closeTabs"}, ()=>window.reload());
        }
        const nextButton = document.querySelectorAll("table")[25].children[0].children[0].children[1].children[3];
        const firstButton = document.querySelectorAll("table")[25].children[0].children[0].children[1].children[1];
        if(!nextButton.children[0]){
            localStorage.setItem("ended", "true");
        };
        if(!!localStorage.getItem("ended")) {
            if(!!firstButton.children[0]){
                firstButton.click();
            } else{
                document.location.reload();
            }
        } else {
            nextButton.click();
        }
    }

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    const changeTypeOfLetter = () => {
        const messTamplates = document.getElementsByClassName("mobanva")[0]
        if(!!messTamplates){
            const quantity = messTamplates.children.length
            const randomChildren =  messTamplates.children[getRandomInRange(2, quantity)];
            if(!!randomChildren){
                randomChildren.children[0].click();
            } else {
                changeTypeOfLetter();
            }
        } else {
            changeTypeOfLetter();
        }

    }

    const checkSentMail = (search10) => {
        let check = 0;
        // points started frow 2 column. 
        if(search10.children[1].innerHTML === "-" || +search10.children[1].innerHTML <=15){check++};
        for(let i = 2; i < 8; i++){
            if(+search10.children[i].innerHTML >= 10 && +search10.children[i].innerHTML <=15){check++};
        }
        if(check===7){
            changeTypeOfLetter();
        } else {window.close()}
    }

    const sendAdmire = () => {   
        document.querySelectorAll("input[name='sendmailsub']")[0].click();
        const sent = +localStorage.getItem("sended");
        localStorage.setItem("sended",sent+1);
    }

    switch(pathname){
        case "/clagt/admire/adr_error.php":
            closeOnMaxOrError();
            break;

        case "/clagt/woman/women_profiles_allow_edit.php":
            insertGirlId();
            break;
        
        case "/clagt/admire/search_matches2.php":
            if(!!urlSearch.match(regexW) && !!urlSearch.match("=Continue")){
                setPointsInMatchPreference();
            }
            break;

        case "/clagt/admire/search_matches3.php" :
            openAllMen();
            delay(23000).then(() => switchPage());
            break;

        case "/clagt/admire/adr_succ2.php":
            window.close();
            break;
    }

    if(!!sendButton){
        const search10 = document.getElementsByTagName("table")[27].children[0].children[1];
        if(!!urlSearch.match(regexW) && !!urlSearch.match(regexM) && !!urlSearch.match(regexId)){
            sendAdmire();
        } else {
            checkSentMail(search10);
        }
    }
}
   