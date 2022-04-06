const btn = document.getElementById("btn");
let lsD = true;

const stor = chrome.storage.sync

btn.onclick = () => {
    stor.get("switch").then(v=>{lsD=v===false?true:false});
    stor.set({switch:lsD});
}



